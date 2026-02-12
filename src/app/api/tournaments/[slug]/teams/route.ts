import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '~/lib/prisma';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;

    const tournament = await prisma.tournament.findUnique({
      where: { slug },
      select: {
        categories: {
          orderBy: { price: 'asc' },
          select: {
            id: true,
            name: true,
            teams: {
              orderBy: { createdAt: 'asc' },
              select: {
                id: true,
                status: true,
                athletes: {
                  select: {
                    athlete: {
                      select: {
                        id: true,
                        name: true,
                        email: true,
                        instagram: true,
                        phone: true,
                        uniformSize: true
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!tournament) {
      return NextResponse.json([]);
    }

    return NextResponse.json(tournament.categories);
  } catch (error) {
    console.error('[LIST_TEAMS_ERROR]', error);

    return NextResponse.json(
      { message: 'Erro ao listar duplas' },
      { status: 500 }
    );
  }
}
