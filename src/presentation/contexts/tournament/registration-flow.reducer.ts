import { Tournament } from '~/types';
import { TournamentListItem } from '../../pages/tournaments/types';
import {
  AthleteFormData,
  RegistrationState,
  RegistrationStep
} from './registration-flow.types';

type Action =
  | { type: 'SET_STEP'; step: RegistrationStep }
  | { type: 'SET_TOURNAMENT'; tournament: Tournament }
  | { type: 'SET_CATEGORIES'; categoryIds: string[] }
  | {
      type: 'SET_TEAMS';
      teams: Record<string, AthleteFormData>;
    }
  | {
      type: 'SET_ATHLETE';
      athlete: AthleteFormData;
    }
  | { type: 'RESET' };

export const registrationReducer = (
  state: RegistrationState,
  action: Action
): RegistrationState => {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, step: action.step };

    case 'SET_TOURNAMENT':
      return {
        ...state,
        tournament: action.tournament,
        tournamentSlug: action.tournament.slug
      };
    case 'SET_CATEGORIES':
      return { ...state, categoryIds: action.categoryIds };

    case 'SET_TEAMS':
      return {
        ...state,
        teams: action.teams
      };
    case 'SET_ATHLETE':
      return {
        ...state,
        athlete: action.athlete
      };

    case 'RESET':
      return {
        step: 'categories',
        tournamentSlug: '',
        categoryIds: [],
        teams: {},
        athlete: {
          email: '',
          instagram: '',
          name: '',
          phone: '',
          uniformSize: null
        }
      };

    default:
      return state;
  }
};
