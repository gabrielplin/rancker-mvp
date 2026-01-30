import { MercadoPagoConfig, Payment } from 'mercadopago';
import { NextResponse } from 'next/server';
import { prisma } from '~/lib/prisma';
import { AthleteFormData } from '~/presentation/contexts';

export async function POST(req: Request) {
  const body = await req.json();

  if (body.type !== 'payment') {
    return NextResponse.json({ received: true });
  }

  const paymentId = body.data.id;

  const mpClient = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN! // pode ser o seu
  });

  const paymentClient = new Payment(mpClient);
  const payment = await paymentClient.get({ id: paymentId });

  if (payment.status !== 'approved') {
    return NextResponse.json({ received: true });
  }

  const { athlete, teamsByCategory, tournamentId } = payment.metadata;

  try {
    const alreadyProcessed = await prisma.team.findFirst({
      where: { stripeSessionId: String(paymentId) }
    });

    if (alreadyProcessed) return NextResponse.json({ received: true });

    const mainAthlete = await prisma.athlete.upsert({
      where: { email: athlete.email },
      update: athlete,
      create: athlete
    });

    for (const [categoryId, partner] of Object.entries(
      teamsByCategory as Record<string, AthleteFormData>
    )) {
      const category = await prisma.category.findFirst({
        where: { id: categoryId, tournamentId }
      });

      if (!category) continue;

      const teamsCount = await prisma.team.count({ where: { categoryId } });

      if (teamsCount >= category.maxTeams) {
        await prisma.category.update({
          where: { id: categoryId },
          data: { status: 'sold_out' }
        });
        continue;
      }

      const partnerAthlete = await prisma.athlete.upsert({
        where: { email: partner.email },
        update: partner,
        create: partner
      });

      await prisma.team.create({
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

    console.log('✅ MP pagamento processado:', paymentId);
  } catch (err) {
    console.error('❌ Webhook MP erro', err);
    return new NextResponse('Internal error', { status: 500 });
  }

  return NextResponse.json({ received: true });
}
