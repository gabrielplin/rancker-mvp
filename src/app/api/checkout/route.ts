import { AthleteFormData } from '~/presentation/contexts';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { NextResponse } from 'next/server';
import {
  PaymentMethods,
  PreferenceRequest
} from 'mercadopago/dist/clients/preference/commonTypes';

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
  accessToken:
    'APP_USR-7621599853833902-013010-be4ad4369a46bec0bdf1d97bc69b0338-549470601'
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
        id: 'sssss',
        title: 'Taxa da plataforma',
        quantity: 1,
        currency_id: 'BRL',
        unit_price: 1
      }
    ];

    const response = await preference.create({
      body: {
        items,
        payer: {
          email: '17.fallcon@gmail.com',
          name: 'Conor',
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
        notification_url: `${process.env.NEXT_PUBLIC_URL}/api/webhook/mercadopago`,
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_URL}/success`,
          failure: `${process.env.NEXT_PUBLIC_URL}/error`,
          pending: `${process.env.NEXT_PUBLIC_URL}/pending`
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
