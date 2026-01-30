import { CategoryStatus } from '@prisma/client';

export interface Category {
  id: string;
  name: string;
  price: number;
  maxInstallments: number;
  maxTeams: number;
  status: CategoryStatus; // available | last_spots | sold_out | in_progress
  lastSpots?: boolean; // true se são últimas vagas
  prizes: Record<string, string>; // { '1º lugar': 'R$ 1.000 + Troféu' }
}

export interface Tournament {
  id: string;
  name: string;
  slug: string;
  description: string;

  startDate: string; // ou Date se você quiser transformar no front
  endDate: string;
  registrationEndAt: string;

  bannerImage: string;
  primaryColor: string;
  secondaryColor: string;

  addressName: string;
  addressStreet: string;
  addressCity: string;
  addressState: string;
  addressZip: string;
  latitude: number;
  longitude: number;

  categories: Category[];
}

export interface TournamentCheckoutProps {
  tournament: Tournament[];
}
