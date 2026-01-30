import { TournamentListItem } from '../types';

export const tournamentsMock: TournamentListItem[] = [
  {
    id: 't-1',
    slug: 'nfp',
    name: 'NFP',
    startDate: '2025-02-10',
    endDate: '2025-02-14',
    categories: [
      {
        id: 'nfp-cat-1',
        name: 'Iniciante',
        price: 250,
        installments: 'em até 5x de R$50,00',
        deadline: 'Abertas até 05/02/2025',
        status: 'available'
      },
      {
        id: 'nfp-cat-2',
        name: 'Amador C',
        price: 300,
        installments: 'em até 10x de R$30,00',
        deadline: 'Abertas até 05/02/2025',
        status: 'last_spots'
      },
      {
        id: 'nfp-cat-3',
        name: 'Amador B',
        status: 'sold_out'
      }
    ]
  },
  {
    id: 't-2',
    slug: 'open-nacional',
    name: 'Open Nacional',
    startDate: '2025-03-05',
    endDate: '2025-03-09',
    categories: [
      {
        id: 'on-cat-1',
        name: 'Estreante',
        price: 280,
        installments: 'em até 7x de R$40,00',
        deadline: 'Abertas até 28/02/2025',
        status: 'available'
      },
      {
        id: 'on-cat-2',
        name: 'Amador A',
        price: 400,
        installments: 'em até 10x de R$40,00',
        deadline: 'Abertas até 28/02/2025',
        status: 'last_spots'
      }
    ]
  },
  {
    id: 't-3',
    slug: 'circuito-shark',
    name: 'Circuito Shark',
    startDate: '2025-04-12',
    endDate: '2025-04-15',
    categories: [
      {
        id: 'cs-cat-1',
        name: 'Misto',
        price: 320,
        installments: 'em até 8x de R$40,00',
        deadline: 'Abertas até 05/04/2025',
        status: 'available'
      },
      {
        id: 'cs-cat-2',
        name: 'Amador B',
        status: 'in_progress'
      }
    ]
  },
  {
    id: 't-4',
    slug: 'futevolei-brasil',
    name: 'Futevôlei Brasil',
    startDate: '2025-05-01',
    endDate: '2025-05-05',
    categories: [
      {
        id: 'fb-cat-1',
        name: 'Iniciante',
        price: 260,
        installments: 'em até 6x de R$43,33',
        deadline: 'Abertas até 25/04/2025',
        status: 'available'
      },
      {
        id: 'fb-cat-2',
        name: 'Estreante',
        price: 300,
        installments: 'em até 10x de R$30,00',
        deadline: 'Abertas até 25/04/2025',
        status: 'last_spots'
      }
    ]
  },
  {
    id: 't-5',
    slug: 'circuito-brasileiro-de-futevolei',
    name: 'Circuito Brasileiro de Futevôlei',
    startDate: '2025-06-20',
    endDate: '2025-06-25',
    categories: [
      {
        id: 'cbf-cat-1',
        name: 'Amador A',
        price: 450,
        installments: 'em até 10x de R$45,00',
        deadline: 'Abertas até 15/06/2025',
        status: 'available'
      },
      {
        id: 'cbf-cat-2',
        name: 'Misto',
        status: 'sold_out'
      }
    ]
  },
  {
    id: 't-6',
    slug: 'estacao-open',
    name: 'Estação Open',
    startDate: '2025-07-10',
    endDate: '2025-07-14',
    categories: [
      {
        id: 'eo-cat-1',
        name: 'Iniciante',
        price: 240,
        installments: 'em até 4x de R$60,00',
        deadline: 'Abertas até 05/07/2025',
        status: 'available'
      },
      {
        id: 'eo-cat-2',
        name: 'Amador C',
        price: 290,
        installments: 'em até 10x de R$29,00',
        deadline: 'Abertas até 05/07/2025',
        status: 'last_spots'
      }
    ]
  }
];
