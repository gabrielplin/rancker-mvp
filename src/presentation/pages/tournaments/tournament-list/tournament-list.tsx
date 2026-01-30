'use client';
import styles from './tournament-list.module.scss';
import { BreadcrumbsContainerTag, TournamentListTag } from './components';
import { FiltersTAG } from './components/filters';
import { TournamentCheckoutProps } from '~/types';
import { useEffect } from 'react';
import { useRegistrationFlow } from '~/presentation/hooks/context/tournament';

function TournamentListComponent({ tournament }: TournamentCheckoutProps) {
  return (
    <div className={styles.container}>
      <BreadcrumbsContainerTag />
      <FiltersTAG />
      <TournamentListTag tournament={tournament} />
    </div>
  );
}

export default TournamentListComponent;
