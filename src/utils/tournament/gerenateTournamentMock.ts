import { TournamentCategory } from '../../presentation/pages/tournaments/types';

const categoryNames: TournamentCategory['name'][] = [
  'Iniciante',
  'Estreante',
  'Amador C',
  'Amador B',
  'Amador A',
  'Misto'
];

const statuses: TournamentCategory['status'][] = [
  'available',
  'last_spots',
  'sold_out',
  'in_progress'
];

export function generateCategories(
  tournamentIndex: number
): TournamentCategory[] {
  return categoryNames
    .slice(0, Math.floor(Math.random() * 4) + 2)
    .map((name, index) => ({
      id: `t${tournamentIndex}-cat-${index}`,
      name,
      price:
        statuses[index % statuses.length] !== 'in_progress'
          ? 280 + index * 40
          : undefined,
      installments: 'em até 10x',
      deadline: 'Abertas até 26/11/2026',
      status: statuses[index % statuses.length]
    }));
}
