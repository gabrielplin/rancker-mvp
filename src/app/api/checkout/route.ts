import { AthleteFormData } from '~/presentation/contexts';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { NextResponse } from 'next/server';

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

export async function POST(req: Request) {
  const body = (await req.json()) as ApiReqProps;

  const {
    athlete,
    categories,
    paymentMethod,
    teamsByCategory,
    tournamentId,
    cardToken,
    installments,
    organizerAccessToken,
    total
  } = body;

  // 💰 Cálculos
  const subtotal = categories.reduce((acc, c) => acc + c.price, 0);
  const platformFee = total - subtotal; // 18
  const totalOrganizer = total - platformFee; //total
  const organizerFee = totalOrganizer * 0.03; // 9
  const applicationFee = platformFee + organizerFee; // 27
  // const total = subtotal; // 318

  console.log(total, applicationFee, 'test');

  // 🔐 MP CLIENT DO ORGANIZADOR
  const mpClient = new MercadoPagoConfig({
    accessToken: 'APP_USR-16c799d2-61f7-47e5-b996-0392042018b5'
  });

  const payment = new Payment(mpClient);

  const response = await payment.create({
    body: {
      transaction_amount: total,
      description: 'Inscrição Rancker',

      payment_method_id: paymentMethod === 'PIX' ? 'pix' : 'credit_card',

      token: paymentMethod === 'CREDIT' ? cardToken : undefined,
      installments:
        paymentMethod === 'CREDIT' ? (installments ?? 1) : undefined,

      payer: {
        email: 'gabriel.nascimenton.19@gmail.com',
        first_name: athlete.name
      },

      // 🔥 MARKETPLACE PRO
      sponsor_id: Number(3169234014),

      // COMISSÃO (Marketplace Pro)
      application_fee: Number(applicationFee.toFixed(2)),

      metadata: {
        tournamentId,
        athlete,
        teamsByCategory
      }
    }
  });

  return NextResponse.json(response);
}
