export interface RankingUser {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  points: number;
}

export interface RankingProps {
  data: RankingUser[];
  showPodium?: boolean;
}
