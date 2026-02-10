import { getTeamsBySlug } from '~/utils/tournament';
import { RegistrationStep } from '~/presentation/contexts';
import { LogoutLayoutTag } from '~/presentation/layouts/logout-layout';
import { TournamentTeamsTag } from '~/presentation/pages';
import { RegistrationFlowProvider } from '~/presentation/providers';

export default async function TournamentTeamsPage({
  params,
  searchParams
}: {
  params: { slug: string };
  searchParams: { step: RegistrationStep | undefined };
}) {
  const { slug } = await params;
  const { step } = await searchParams;
  const categories = await getTeamsBySlug(slug);

  if (!categories) {
    return <div>Duplas não encontrada</div>;
  }

  return (
    <LogoutLayoutTag>
      <RegistrationFlowProvider
        tournamentSlug={slug}
        initialStep={step ?? 'categories'}
      >
        <TournamentTeamsTag categories={categories} />
      </RegistrationFlowProvider>
    </LogoutLayoutTag>
  );
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
