import { NextResponse } from 'next/server';
import { prisma } from '~/lib/prisma';

type Params = {
  params: {
    slug: string;
  };
};

export async function GET(req: Request, { params }: Params) {
  const { slug } = await params;

  const tournament = await prisma.tournament.findUnique({
    where: { slug },
    include: {
      categories: {
        orderBy: {
          price: 'asc'
        }
      }
    }
  });

  if (!tournament) {
    return NextResponse.json(
      { message: 'Torneio não encontrado' },
      { status: 404 }
    );
  }

  return NextResponse.json(tournament);
}
