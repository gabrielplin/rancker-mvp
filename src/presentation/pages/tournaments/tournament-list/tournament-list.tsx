'use client';
import { TournamentCheckoutProps } from '~/types';
import { BreadcrumbsContainerTag, TournamentListTag } from './components';
import { FiltersTAG } from './components/filters';
import styles from './tournament-list.module.scss';

function TournamentListComponent({ tournament }: TournamentCheckoutProps) {
  console.log(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY);
  return (
    <div className={styles.container}>
      <BreadcrumbsContainerTag />
      <FiltersTAG />
      <TournamentListTag tournament={tournament} />
    </div>
  );
}

export default TournamentListComponent;
