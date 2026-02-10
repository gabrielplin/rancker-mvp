export async function getTeamsBySlug(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/tournaments/${slug}/teams`,
    {
      cache: 'no-store' // para garantir que sempre busque do server
    }
  );

  if (!res.ok) return null;

  const categories = res.json();

  if (!categories) return;

  return categories;
}
