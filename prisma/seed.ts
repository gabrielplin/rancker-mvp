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
      id: 'na-ilha-180426',
      name: 'Na Ilha World Cup',
      slug: 'na-ilha-world-cup',
      description:
        'Os jogos terão início às 8:30h. A chegada dos grupos será marcada para 30 min antes do início dos jogos. Lembrando que os grupos e horários serão pré definidos. Ex: Grupo A, B e C chegada às 8h e inicio dos jogos às 8:30h. A tolerância de atraso será de 10 minutos no primeira rodada e 5 minutos nos demais jogos. Do contrário, será contabilizado como W.O.',

      startDate: new Date('2026-04-18T08:00:00Z'),
      endDate: new Date('2026-04-26T22:00:00Z'),
      registrationEndAt: new Date('2026-04-18T23:59:59Z'),

      bannerImage:
        'https://rancker-assets.s3.amazonaws.com/banners/open-na-ilha.png',

      primaryColor: '#d10100',
      secondaryColor: '#721310',

      addressName: 'Na Ilha Beach Sports',
      addressStreet: 'Praça sete de fevereiro, 89',
      addressCity: 'São Paulo',
      addressState: 'SP',
      addressZip: '03358-020',
      latitude: -23.5636982,
      longitude: -46.5514279
    }
  });

  // 🏷️ Categorias
  await prisma.category.createMany({
    data: [
      {
        id: 'na-ilha-masc-e',
        name: 'Masculino Estreante',
        price: 290,
        maxInstallments: 6,
        maxTeams: 48,
        status: CategoryStatus.available,
        prizes: {
          '1º lugar': 'R$ 1.000 + Troféu',
          '2º lugar': 'R$ 500',
          '3º lugar': 'Kit patrocinador'
        },
        tournamentId: tournament.id
      },
      {
        id: 'na-ilha-mist-e',
        name: 'Misto Estreante',
        price: 290,
        maxInstallments: 6,
        maxTeams: 48,
        status: CategoryStatus.available,
        prizes: {
          '1º lugar': 'R$ 1.000 + Troféu',
          '2º lugar': 'R$ 500',
          '3º lugar': 'Kit patrocinador'
        },
        tournamentId: tournament.id
      },
      {
        id: 'na-ilha-masc-i',
        name: 'Masculino Iniciante',
        price: 290,
        maxInstallments: 6,
        maxTeams: 48,
        status: CategoryStatus.available,
        prizes: {
          '1º lugar': 'R$ 1.000 + Troféu',
          '2º lugar': 'R$ 500',
          '3º lugar': 'Kit patrocinador'
        },
        tournamentId: tournament.id
      },
      {
        id: 'na-ilha-amad-c',
        name: 'Amador C',
        price: 290,
        maxInstallments: 6,
        maxTeams: 48,
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
