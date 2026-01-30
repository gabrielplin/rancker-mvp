'use client';

import { createContext } from 'react';
import {
  AthleteFormData,
  RegistrationState,
  RegistrationStep
} from './registration-flow.types';
import { Category, Tournament } from '~/types';

type RegistrationFlowContextData = {
  state: RegistrationState;

  // derived
  selectedCategories: Category[];
  subtotal: number;
  fee: number;
  total: number;
  hasAllTeamsSelected: boolean;

  // actions
  setStep: (step: RegistrationStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  setCategories: (ids: string[]) => void;
  setTeams: (teams: Record<string, AthleteFormData>) => void;
  setAthlete: (athlete: AthleteFormData) => void;
  setTournament: (tournament: Tournament) => void;
};

export const RegistrationFlowContext =
  createContext<RegistrationFlowContextData>({} as RegistrationFlowContextData);
