export type TournamentCategory = {
  id: string;
  name:
    | 'Iniciante'
    | 'Estreante'
    | 'Amador C'
    | 'Amador B'
    | 'Amador A'
    | 'Misto';

  price?: number;
  installments?: string;
  deadline?: string;
  status: 'available' | 'last_spots' | 'sold_out' | 'in_progress';
};

export type TournamentListItem = {
  id: string;
  slug: string;
  name: string;
  startDate: string;
  endDate: string;
  categories: TournamentCategory[];
};

export type FormDataCategory = {
  categories: string[];
};
