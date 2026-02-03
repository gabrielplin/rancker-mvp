export type TournamentCategory = {
  id: string;
  name:
    | 'Masculino Iniciante'
    | 'Masculino Estreante'
    | 'Amador C'
    | 'Amador B'
    | 'Amador A'
    | 'Misto Estreante';

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
