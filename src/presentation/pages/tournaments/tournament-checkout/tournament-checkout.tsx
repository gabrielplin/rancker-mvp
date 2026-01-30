'use client';
import styles from './tournament-checkout.module.scss';

import { StepRendererTag } from './components/steps';
import { TournamentListItem } from '../types';
import { useEffect } from 'react';
import { StepTabTag } from './components';
import { useRegistrationFlow } from '~/presentation/hooks/context/tournament';

type TournamentCheckoutComponentProps = {
  tournament: TournamentListItem;
};

const TournamentCheckoutComponent = (
  props: TournamentCheckoutComponentProps
) => {
  const { state, setTournament } = useRegistrationFlow();

  useEffect(() => {
    setTournament(props.tournament);
  }, [props.tournament.id]);

  return (
    <div className={styles.checkoutContainer}>
      {state.step !== 'categories' && <StepTabTag />}
      <StepRendererTag step={state.step} />
    </div>
  );
};

export default TournamentCheckoutComponent;
