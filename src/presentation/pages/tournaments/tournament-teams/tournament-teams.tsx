'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { TabsTag } from '~/presentation/components/common';
import styles from './tournament.module.scss';
import { TeamItemTag } from './components/team-item';

export type TeamStatus = 'pending' | 'paid' | 'cancelled';

type TeamAthlete = {
  athlete: {
    id: string;
    name: string;
    email: string;
    instagram: string;
    phone: string;
    uniformSize: string;
  };
};

export type Team = {
  id: string;
  status: TeamStatus;
  athletes: TeamAthlete[];
};

export type CategoryTeams = {
  id: string;
  name: string;
  teams: Team[];
};

interface TournamentTeamsProps {
  categories: CategoryTeams[];
}

function TournamentTeamsComponent({ categories }: TournamentTeamsProps) {
  const queryParams = useSearchParams();
  const router = useRouter();

  const categoryParam = queryParams.get('category');

  const initialTab = categories.findIndex(
    category => category.id === categoryParam
  );

  const safeInitialTab = initialTab !== -1 ? initialTab : 0;

  const handleClick = (index: number) => {
    const params = new URLSearchParams(queryParams.toString());
    params.set('category', categories[index].id);

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className={styles.listTeams}>
      <h2>Confira quem entrará em jogo</h2>
      <p>Acompanhe as duplas e o pagamento das inscrições.</p>

      {}
      <TabsTag
        initial={safeInitialTab}
        onClick={handleClick}
        tabs={categories.map(category => ({
          label: category.name,
          content: !category?.teams ? (
            <span>Nenhuma dupla Registrada</span>
          ) : (
            <div className={styles.contentStatus}>
              <div className={styles.headStatus}>
                <span>Duplas</span>
                <span>Categoria</span>
                <span>Inscrição</span>
              </div>

              <ul className={styles.bodyStatus}>
                {category.teams.map(team => (
                  <TeamItemTag category={category} team={team} key={team.id} />
                ))}
              </ul>
            </div>
          )
        }))}
      />
    </div>
  );
}

export default TournamentTeamsComponent;
