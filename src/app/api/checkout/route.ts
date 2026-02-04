import { AthleteFormData } from '~/presentation/contexts';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { NextResponse } from 'next/server';
import { PreferenceRequest } from 'mercadopago/dist/clients/preference/commonTypes';
import { formatPayerName } from '~/utils';
import { prisma } from '~/lib/prisma';

interface ApiReqProps {
  tournamentId: string;
  categories: {
    id: string;
    name: string;
    price: number;
  }[];
  teamsByCategory: Record<string, AthleteFormData>;
  athlete: AthleteFormData;
  paymentMethod: 'PIX' | 'CREDIT';
  cardToken?: string;
  installments?: number;
  organizerAccessToken: string; // 🔑
  total: number;
}

const mp = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!
});

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ApiReqProps;

    const { athlete, categories, teamsByCategory, tournamentId, total } = body;

    // 💰 Cálculos
    const subtotal = categories.reduce((acc, c) => acc + c.price, 0);
    const platformFee = total - subtotal; // 18
    const totalOrganizer = total - platformFee; //total
    const organizerFee = totalOrganizer * 0.03; // 9
    const applicationFee = platformFee + organizerFee; // 27

    const preference = new Preference(mp);

    const items: PreferenceRequest['items'] = [
      ...categories.map(c => ({
        id: c.id,
        title: c.name,
        quantity: 1,
        currency_id: 'BRL',
        unit_price: c.price
      })),
      {
        id: '3235233332sdfgg',
        title: 'Taxa da plataforma',
        quantity: 1,
        currency_id: 'BRL',
        unit_price: platformFee
      }
    ];

    const payerName = formatPayerName({
      athlete,
      categories,
      teamsByCategory
    });

    const response = await preference.create({
      body: {
        items,
        payer: {
          email: athlete.email,
          name: payerName,
          surname: 'Atleta'
        },

        marketplace: 'Rancker',
        metadata: {
          tournamentId,
          athlete,
          teamsByCategory,
          tax: applicationFee
        },

        back_urls: {
          success: `https://rancker-mvp.vercel.app/success`,
          failure: `https://rancker-mvp.vercel.app/error`,
          pending: `https://rancker-mvp.vercel.app/pending`
        }
      }
    });

    /* ------------------------------------------------------------------
     * 3️⃣ Persistência no banco (ATÔMICA + PROTEGIDA)
     * ------------------------------------------------------------------ */
    await prisma.$transaction(async tx => {
      // atleta principal
      const mainAthlete = await tx.athlete.upsert({
        where: { email: athlete.email },
        update: athlete,
        create: athlete
      });

      // para cada categoria cria a dupla
      for (const [categoryId, partner] of Object.entries(teamsByCategory)) {
        const partnerAthlete = await tx.athlete.upsert({
          where: { email: partner.email },
          update: partner,
          create: partner
        });

        // 🔒 proteção contra duplicação
        const existingTeam = await tx.team.findFirst({
          where: {
            tournamentId,
            categoryId,
            paymentId: String(response.id)
          }
        });

        if (existingTeam) continue;

        await tx.team.create({
          data: {
            tournamentId,
            categoryId,
            status: 'pending', // 👈 você valida manualmente depois
            paymentId: String(response.id),
            stripeSessionId: String(response.id), // reaproveitando campo
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

    return NextResponse.json({
      preferenceId: response.id
    });
  } catch (err) {
    console.log(err, 'Error');
  }
}
