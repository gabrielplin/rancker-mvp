'use client';

import { useMemo, useReducer } from 'react';
import {
  AthleteFormData,
  RegistrationFlowContext,
  registrationReducer,
  RegistrationStep
} from '../../contexts';
import { TournamentListItem } from '../../pages/tournaments/types';
import { Tournament } from '~/types';

type Props = {
  children: React.ReactNode;
  tournamentSlug: string;
  initialStep?: RegistrationStep;
};

export const RegistrationFlowProvider = ({
  children,
  tournamentSlug,
  initialStep = 'categories'
}: Props) => {
  const [state, dispatch] = useReducer(registrationReducer, {
    step: initialStep,
    tournamentSlug,
    categoryIds: [],
    teams: {},
    athlete: {
      email: '',
      instagram: '',
      name: '',
      phone: '',
      uniformSize: null
    }
  });

  /* ---------------- DERIVED DATA ---------------- */

  const selectedCategories = useMemo(() => {
    if (!state.tournament) return [];
    return state.tournament.categories.filter(category =>
      state.categoryIds.includes(category.id)
    );
  }, [state.tournament, state.categoryIds]);

  const subtotal = useMemo(
    () =>
      selectedCategories.reduce(
        (acc, category) => acc + (category.price ?? 0),
        0
      ),
    [selectedCategories]
  );
  const fee = subtotal * 0.04;

  const total = subtotal + fee;

  // const hasAllTeamsSelected = useMemo(() => {
  //   return selectedCategories.every(category =>
  //     Boolean(state.teams[category.id]?.length)
  //   );
  // }, [selectedCategories, state.teams]);

  const hasAllTeamsSelected = true;

  /* ---------------- ACTIONS ---------------- */

  const setStep = (step: RegistrationStep) =>
    dispatch({ type: 'SET_STEP', step });

  const nextStep = () => {
    const flow: RegistrationStep[] = ['categories', 'info', 'teams', 'payment'];
    const index = flow.indexOf(state.step);
    if (index < flow.length - 1) {
      dispatch({ type: 'SET_STEP', step: flow[index + 1] });
    }
  };

  const prevStep = () => {
    const flow: RegistrationStep[] = ['categories', 'info', 'teams', 'payment'];
    const index = flow.indexOf(state.step);
    if (index > 0) {
      dispatch({ type: 'SET_STEP', step: flow[index - 1] });
    }
  };

  const setCategories = (ids: string[]) =>
    dispatch({ type: 'SET_CATEGORIES', categoryIds: ids });

  const setTeams = (teams: Record<string, AthleteFormData>) =>
    dispatch({ type: 'SET_TEAMS', teams });

  const setTournament = (tournament: Tournament) =>
    dispatch({ type: 'SET_TOURNAMENT', tournament });

  const setAthlete = (athlete: AthleteFormData) => {
    dispatch({ type: 'SET_ATHLETE', athlete });
  };

  return (
    <RegistrationFlowContext.Provider
      value={{
        state,

        /* derived */
        selectedCategories,
        subtotal,
        fee,
        total,
        hasAllTeamsSelected,

        /* actions */
        setStep,
        nextStep,
        prevStep,
        setCategories,
        setTeams,
        setTournament,
        setAthlete
      }}
    >
      {children}
    </RegistrationFlowContext.Provider>
  );
};
