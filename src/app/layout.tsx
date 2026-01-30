import { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import '../styles/base/_global.scss';

import { Figtree } from 'next/font/google';
import { AlertModalProvider } from '~/presentation/providers';

const figtree = Figtree({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-figtree',
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: 'Rancker Sport | Plataforma Oficial de Torneios e Rankings',
  description:
    'Rancker Sport é a plataforma oficial para criação, gestão e crescimento de torneios esportivos. Rankings oficiais, inscrições online, pagamentos integrados, visibilidade para atletas e ferramentas completas para organizadores.',
  icons: {
    icon: '/rancker-icon.png',
    shortcut: '/rancker-icon.png',
    apple: '/rancker-icon.png'
  },
  openGraph: {
    title: 'Rancker Sport | Onde torneios crescem e atletas evoluem',
    description:
      'Crie torneios, ganhe visibilidade, fortaleça seu ranking e atraia mais atletas. A Rancker conecta organizadores e atletas em um ecossistema esportivo completo.',
    images: [
      {
        url: '/assets/png/tournament.jpg',
        width: 1200,
        height: 630,
        alt: 'Rancker Sport - Plataforma de Torneios'
      }
    ],
    type: 'website'
  }
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='pt-br' className={figtree.variable}>
      <AlertModalProvider>
        <body>{children}</body>
      </AlertModalProvider>
    </html>
  );
}
