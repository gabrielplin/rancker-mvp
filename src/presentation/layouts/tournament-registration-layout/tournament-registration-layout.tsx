import { PropsWithChildren } from 'react';
import { TournamentRegistrationHeaderTag } from '~/architecture/presentation/layouts/tournament-registration-layout/components';

function TournamentRegistrationLayoutComponent({
  children
}: PropsWithChildren) {
  return (
    <div>
      <TournamentRegistrationHeaderTag />

      <main>{children}</main>
    </div>
  );
}

export default TournamentRegistrationLayoutComponent;
