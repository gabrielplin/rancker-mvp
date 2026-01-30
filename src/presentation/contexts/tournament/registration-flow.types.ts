import { Tournament } from '~/types';

export type AthleteFormData = {
  name: string;
  email: string;
  uniformSize: 'PP' | 'P' | 'M' | 'G' | 'XG' | null;
  instagram: string;
  phone: string;
};

export type RegistrationStep = 'categories' | 'info' | 'teams' | 'payment';

export type RegistrationState = {
  step: RegistrationStep;
  tournamentSlug: string;
  tournament?: Tournament;
  categoryIds: string[];
  teams: Record<string, AthleteFormData>; // categoryId → athleteIds
  athlete: AthleteFormData;
};
