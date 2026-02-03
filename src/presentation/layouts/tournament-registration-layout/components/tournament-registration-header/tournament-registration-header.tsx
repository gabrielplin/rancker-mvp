'use client';
import { useRouter } from 'next/navigation';

import styles from './tournament-registration-header.module.scss';
import { ChevronLeftIcon, LogoTextIcon } from '~/presentation/components/icons';

function TournamentRegistrationHeaderComponent() {
  const router = useRouter();

  return (
    <div className={styles['tournament-registration-header']}>
      <div className={styles['tournament-registration-header__content']}>
        <button
          onClick={router.back}
          className={
            styles['tournament-registration-header__content__icon-button']
          }
        >
          <ChevronLeftIcon />
        </button>

        <LogoTextIcon />

        <div
          className={
            styles['tournament-registration-header__content__icon-button']
          }
        />
      </div>
    </div>
  );
}

export default TournamentRegistrationHeaderComponent;
