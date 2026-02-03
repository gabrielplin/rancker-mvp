import { PropsWithChildren } from 'react';
import { TournamentRegistrationHeaderTag } from './components';

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
