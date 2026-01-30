import { LogoutLayoutTag } from '~/presentation/layouts/logout-layout';
import { TournamentListTag } from '~/presentation/pages/tournaments';
import { getTournaments } from '~/utils/tournament/get-tournaments';

export default async function AthletePage() {
  const tournaments = await getTournaments();
  return (
    <LogoutLayoutTag>
      <TournamentListTag tournament={tournaments} />
    </LogoutLayoutTag>
  );
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
