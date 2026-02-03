import { tournamentsMock } from '~/presentation/pages/tournaments/constants';

export async function getTournamentBySlug(slug: string) {
  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_URL}/api/tournaments/${slug}`,
  //   {
  //     cache: 'no-store' // para garantir que sempre busque do server
  //   }
  // );

  // if (!res.ok) return null;

  const tournament = tournamentsMock.find(t => t.slug === slug);

  if (!tournament) return;

  return tournament;
}
