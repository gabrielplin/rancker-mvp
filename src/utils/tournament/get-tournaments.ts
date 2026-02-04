export async function getTournaments() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tournaments`, {
    cache: 'no-store'
  });

  if (!res.ok) return [];

  const tournaments = await res.json();
  return tournaments;
}
