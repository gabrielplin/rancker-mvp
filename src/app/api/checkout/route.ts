import { AthleteFormData } from '~/presentation/contexts';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { NextResponse } from 'next/server';
import { PreferenceRequest } from 'mercadopago/dist/clients/preference/commonTypes';
import { formatPayerName } from '~/utils';

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
  // accessToken: process.env.MP_ACCESS_TOKEN!,
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
    // const total = subtotal; // 318

    const preference = new Preference(mp);

    const items: PreferenceRequest['items'] = [
      // ...categories.map(c => ({
      //   id: c.id,
      //   title: c.name,
      //   quantity: 1,
      //   currency_id: 'BRL',
      //   unit_price: c.price
      // })),
      {
        id: '3235233332sdfgg',
        title: 'Taxa da plataforma',
        quantity: 1,
        currency_id: 'BRL',
        unit_price: 1.5
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
          email: 'conrado@gmail.com',
          name: payerName,
          surname: 'Atleta'
        },
        // payer: {
        //   email: athlete.email,
        //   name: athlete.name,
        //   surname: 'Atleta'
        // },

        marketplace: 'Rancker',
        metadata: {
          tournamentId,
          athlete,
          teamsByCategory,
          tax: applicationFee
        },

        marketplace_fee: 0,
        // marketplace_fee: Number(applicationFee.toFixed(2)),
        notification_url: `https://rancker.com/api/webhook/mercadopago`,
        back_urls: {
          success: `https://rancker.com/success`,
          failure: `https://rancker.com/error`,
          pending: `https://rancker.com/pending`
        }
      }
    });

    return NextResponse.json({
      preferenceId: response.id
    });
  } catch (err) {
    console.log(err, 'Error');
  }
}
