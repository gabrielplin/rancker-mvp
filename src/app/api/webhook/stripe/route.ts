import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { prisma } from '~/lib/prisma';
import { AthleteFormData } from '~/presentation/contexts';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-01-28.clover'
});

export async function POST(req: Request) {
  const signature = req.headers.get('stripe-signature');
  if (!signature) {
    return new NextResponse('Missing stripe signature', { status: 400 });
  }

  const body = await req.text(); // ⚠️ Use text() para webhooks

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('❌ Webhook signature verification failed', err);
    return new NextResponse('Webhook Error', { status: 400 });
  }

  // Só processa checkout session completa
  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  // Só processa se pago
  if (session.payment_status !== 'paid') {
    return NextResponse.json({ received: true });
  }

  // Checa metadata
  if (
    !session.metadata?.athlete ||
    !session.metadata?.teamsByCategory ||
    !session.metadata?.tournament_id
  ) {
    console.warn('⚠️ Metadata incompleta, ignorando evento');
    return NextResponse.json({ received: true });
  }

  const athlete: AthleteFormData = JSON.parse(session.metadata.athlete);
  const teamsByCategory: Record<string, AthleteFormData> = JSON.parse(
    session.metadata.teamsByCategory
  );
  const platformFee = parseFloat(session.metadata.platformFee ?? '0');

  try {
    // 🔐 idempotência por stripeSessionId
    const alreadyProcessed = await prisma.team.findFirst({
      where: { stripeSessionId: session.id }
    });
    if (alreadyProcessed) {
      console.log('🔁 Session já processada:', session.id);
      return NextResponse.json({ received: true });
    }

    // Upsert atleta principal
    const mainAthlete = await prisma.athlete.upsert({
      where: { email: athlete.email },
      update: {
        name: athlete.name,
        instagram: athlete.instagram,
        phone: athlete.phone,
        uniformSize: athlete.uniformSize ?? undefined
      },
      create: {
        ...athlete,
        uniformSize: athlete.uniformSize ?? 'M'
      }
    });

    // Cria times por categoria
    for (const [categoryId, partner] of Object.entries(teamsByCategory)) {
      const category = await prisma.category.findFirst({
        where: { id: categoryId, tournamentId: session.metadata.tournament_id! }
      });

      if (!category) {
        console.error('Categoria inválida:', categoryId);
        continue;
      }

      // Upsert parceiro
      const partnerAthlete = await prisma.athlete.upsert({
        where: { email: partner.email },
        update: {
          name: partner.name,
          instagram: partner.instagram,
          phone: partner.phone,
          uniformSize: partner.uniformSize ?? undefined
        },
        create: {
          ...partner,
          uniformSize: partner.uniformSize ?? 'M'
        }
      });

      // Verifica duplicidade do atleta na categoria
      const existingTeam = await prisma.team.findFirst({
        where: {
          categoryId,
          athletes: {
            some: { athleteId: mainAthlete.id }
          }
        }
      });
      if (existingTeam) {
        console.log('Atleta já registrado nesta categoria:', categoryId);
        continue;
      }

      // Verifica limite de equipes
      const teamsCount = await prisma.team.count({ where: { categoryId } });
      if (teamsCount >= category.maxTeams) {
        console.log('Categoria lotada:', categoryId);

        await prisma.category.update({
          where: { id: categoryId },
          data: { status: 'sold_out' }
        });

        continue;
      }

      // Cria o time
      await prisma.team.create({
        data: {
          tournamentId: session.metadata.tournament_id!,
          categoryId,
          stripeSessionId: session.id,
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

    console.log('✅ Webhook processado com sucesso:', session.id);
  } catch (err) {
    console.error('❌ Erro ao processar webhook', err);
    return new NextResponse('Internal error', { status: 500 });
  }

  return NextResponse.json({ received: true });
}
