import { prisma } from '~/lib/prisma';

export async function GET() {
  try {
    const tournaments = await prisma.tournament.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        startDate: true,
        endDate: true,
        registrationEndAt: true,
        bannerImage: true,
        primaryColor: true,
        secondaryColor: true,
        description: true,
        addressName: true,
        categories: {
          select: {
            id: true,
            name: true,
            price: true,
            maxInstallments: true,
            maxTeams: true,
            status: true,
            prizes: true
          }
        }
      }
    });

    return new Response(JSON.stringify(tournaments), {
      status: 200
    });
  } catch (error) {
    console.error('Erro ao buscar torneios:', error);
    return new Response('Erro interno', { status: 500 });
  }
}
