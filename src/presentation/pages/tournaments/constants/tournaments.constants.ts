import { Tournament } from '~/types';

export const tournamentsMock: Tournament[] = [
  {
    id: 'na-ilha-99180',
    slug: 'na-ilha-world-cup',
    name: 'Na Ilha World Cup',
    startDate: '2026-04-18',
    endDate: '2026-04-26',
    addressCity: 'São Paulo',
    addressName: 'Na Ilha Beach Sports',
    addressState: 'SP',
    addressStreet: 'Praça sete de fevereiro, 89',
    addressZip: '03358-020',
    bannerImage: '',
    description:
      'Os jogos terão início às 8:30h. A chegada dos grupos será marcada para 30 min antes do início dos jogos. Lembrando que os grupos e horários serão pré definidos. Ex: Grupo A, B e C chegada às 8h e inicio dos jogos às 8:30h. A tolerância de atraso será de 10 minutos no primeira rodada e 5 minutos nos demais jogos. Do contrário, será contabilizado como W.O. ',
    latitude: -23.5636982,
    longitude: -46.5514279,
    primaryColor: '#d10100',
    secondaryColor: '#721310',
    registrationEndAt: '16/04/2026',
    categories: [
      {
        id: 'na-ilha-masc-e',
        name: 'Masculino Estreante',
        price: 290,
        maxInstallments: 6,
        deadline: '18/04/2026',
        status: 'available',
        maxTeams: 48,
        prizes: {
          'Trofeus:': 'para 1, 2, 3 e 4',
          '1': 'R$500,00'
        }
      },
      {
        id: 'na-ilha-mist-e',
        name: 'Misto Estreante',
        price: 290,
        maxInstallments: 6,
        deadline: 'Abertas até 19/04/2026',
        status: 'available',
        maxTeams: 48,
        prizes: {}
      },
      {
        id: 'na-ilha-masc-i',
        name: 'Masculino Iniciante',
        price: 290,
        maxInstallments: 6,
        deadline: '25/04/2026',
        status: 'available',
        maxTeams: 48,
        prizes: {}
      },
      {
        id: 'na-ilha-amad-c',
        name: 'Amador C',
        price: 290,
        maxInstallments: 6,
        deadline: '26/04/2026',
        status: 'available',
        maxTeams: 48,
        prizes: {}
      }
    ]
  }
];
