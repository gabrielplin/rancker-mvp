import { PrismaClient, CategoryStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 🔥 Limpa dados (opcional, mas recomendado em MVP)
  await prisma.teamAthlete.deleteMany();
  await prisma.team.deleteMany();
  await prisma.category.deleteMany();
  await prisma.tournament.deleteMany();

  // 🏆 Torneio
  const tournament = await prisma.tournament.create({
    data: {
      name: 'Open na Ilha',
      slug: 'open-na-ilha',
      description:
        'O maior torneio de beach tennis da região. Categorias para todos os níveis.',

      startDate: new Date('2026-02-20T08:00:00Z'),
      endDate: new Date('2026-02-23T22:00:00Z'),
      registrationEndAt: new Date('2026-02-15T23:59:59Z'),

      bannerImage:
        'https://rancker-assets.s3.amazonaws.com/banners/open-na-ilha.png',

      primaryColor: '#0F172A',
      secondaryColor: '#38BDF8',

      addressName: 'Arena Ilha Sports',
      addressStreet: 'Av. Beira Mar, 1234',
      addressCity: 'Florianópolis',
      addressState: 'SC',
      addressZip: '88000-000',
      latitude: -27.59487,
      longitude: -48.54822
    }
  });

  // 🏷️ Categorias
  await prisma.category.createMany({
    data: [
      {
        name: 'Amador B + C',
        price: 320,
        maxInstallments: 3,
        maxTeams: 32,
        status: CategoryStatus.available,
        prizes: {
          '1º lugar': 'R$ 1.000 + Troféu',
          '2º lugar': 'R$ 500',
          '3º lugar': 'Kit patrocinador'
        },
        tournamentId: tournament.id
      },
      {
        name: 'Iniciante',
        price: 320,
        maxInstallments: 2,
        maxTeams: 24,
        status: CategoryStatus.available,
        prizes: {
          '1º lugar': 'Troféu + Brindes',
          '2º lugar': 'Brindes'
        },
        tournamentId: tournament.id
      },
      {
        name: 'Estreante',
        price: 320,
        maxInstallments: 2,
        maxTeams: 24,
        status: CategoryStatus.available,
        prizes: {
          '1º lugar': 'Troféu',
          '2º lugar': 'Medalha'
        },
        tournamentId: tournament.id
      },
      {
        name: 'Open',
        price: 320,
        maxInstallments: 4,
        maxTeams: 16,
        status: CategoryStatus.available,
        prizes: {
          '1º lugar': 'R$ 2.000 + Troféu',
          '2º lugar': 'R$ 1.000',
          '3º lugar': 'R$ 500'
        },
        tournamentId: tournament.id
      }
    ]
  });

  console.log('✅ Seed executado com sucesso!');
}

main()
  .catch(e => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
