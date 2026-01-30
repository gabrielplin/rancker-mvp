import { RegistrationStep } from '~/presentation/contexts';
import { LogoutLayoutTag } from '~/presentation/layouts/logout-layout';
import { TournamentCheckoutTag } from '~/presentation/pages';
import { RegistrationFlowProvider } from '~/presentation/providers';
import { getTournamentBySlug } from '~/utils/tournament';

export default async function TournamentRegistrationPage({
  params,
  searchParams
}: {
  params: { slug: string };
  searchParams: { step: RegistrationStep | undefined };
}) {
  const { slug } = await params;
  const { step } = await searchParams;
  const tournament = await getTournamentBySlug(slug);

  if (!tournament) {
    return <div>Torneio não encontrado</div>;
  }
  return (
    <LogoutLayoutTag>
      <RegistrationFlowProvider
        tournamentSlug={slug}
        initialStep={step ?? 'categories'}
      >
        <TournamentCheckoutTag tournament={tournament} />
      </RegistrationFlowProvider>
    </LogoutLayoutTag>
  );
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
