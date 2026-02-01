import { MercadoPagoConfig, Payment } from 'mercadopago';
import { NextResponse } from 'next/server';
import { prisma } from '~/lib/prisma';
import { AthleteFormData } from '~/presentation/contexts';

export async function POST(req: Request) {
  let body: any;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ received: true });
  }

  /**
   * Mercado Pago envia vários eventos
   * Só processamos payment
   */
  if (body.type !== 'payment') {
    return NextResponse.json({ received: true });
  }

  const paymentId = body.data?.id;
  if (!paymentId) {
    return NextResponse.json({ received: true });
  }

  const mpClient = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN!
  });

  const paymentClient = new Payment(mpClient);
  const payment = await paymentClient.get({ id: String(paymentId) });

  /**
   * PIX e cartão só entram aqui quando CONFIRMADOS
   */
  if (payment.status !== 'approved') {
    return NextResponse.json({ received: true });
  }

  const { athlete, teamsByCategory, tournamentId } = payment.metadata as {
    athlete: AthleteFormData;
    teamsByCategory: Record<string, AthleteFormData>;
    tournamentId: string;
  };

  try {
    await prisma.$transaction(async tx => {
      /**
       * 🔒 Idempotência forte
       */
      const alreadyProcessed = await tx.payment.findUnique({
        where: { id: String(paymentId) }
      });

      if (alreadyProcessed) return;

      /**
       * 💾 Salva pagamento
       */
      await tx.payment.create({
        data: {
          id: String(paymentId),
          provider: 'mercadopago',
          status: payment.status,
          amount: payment.transaction_amount,
          tournamentId,
          athleteEmail: athlete.email
        }
      });

      /**
       * 🧍‍♂️ Atleta principal
       */
      const mainAthlete = await tx.athlete.upsert({
        where: { email: athlete.email },
        update: athlete,
        create: athlete
      });

      /**
       * 🏆 Criação dos times
       */
      for (const [categoryId, partner] of Object.entries(teamsByCategory)) {
        const category = await tx.category.findFirst({
          where: { id: categoryId, tournamentId }
        });

        if (!category) continue;

        const teamsCount = await tx.team.count({
          where: { categoryId }
        });

        if (teamsCount >= category.maxTeams) {
          await tx.category.update({
            where: { id: categoryId },
            data: { status: 'sold_out' }
          });
          continue;
        }

        const partnerAthlete = await tx.athlete.upsert({
          where: { email: partner.email },
          update: partner,
          create: partner
        });

        await tx.team.create({
          data: {
            tournamentId,
            categoryId,
            stripeSessionId: String(paymentId),
            status: 'paid',
            athletes: {
              create: [
                { athleteId: mainAthlete.id },
                { athleteId: partnerAthlete.id }
              ]
            }
          }
        });
      }
    });

    console.log('✅ MP pagamento confirmado:', paymentId);
  } catch (err) {
    console.error('❌ Webhook MP erro:', err);
    return new NextResponse('Internal error', { status: 500 });
  }

  return NextResponse.json({ received: true });
}
