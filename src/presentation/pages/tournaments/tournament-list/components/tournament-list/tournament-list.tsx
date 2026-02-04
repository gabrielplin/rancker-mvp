'use client';

import styles from './tournament-list.module.scss';
import { EventCardTag } from '~/presentation/components/common';
import { TournamentCheckoutProps } from '~/types';

function TournamentList({ tournament }: TournamentCheckoutProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Confira os campeonatos da Rancker</h2>
      </div>
      <div className={styles.card__list}>
        {tournament.map(event => {
          return (
            <EventCardTag
              key={event.id}
              title={event.name}
              status='OPENED'
              type={event.categories[0].name}
              date={event.startDate}
              banner={'/assets/na-ilha/ilha.png'}
              slug={event.slug}
            />
          );
        })}
      </div>
    </div>
  );
}

export default TournamentList;
