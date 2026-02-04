import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '~/lib/prisma';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

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
