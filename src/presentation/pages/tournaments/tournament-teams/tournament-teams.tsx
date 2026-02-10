'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { TabsTag } from '~/presentation/components/common';
import styles from './tournament.module.scss';

type TeamStatus = 'pending' | 'paid' | 'cancelled';

type TeamAthlete = {
  athlete: {
    id: string;
    name: string;
  };
};

type Team = {
  id: string;
  status: TeamStatus;
  athletes: TeamAthlete[];
};

type CategoryTeams = {
  id: string;
  name: string;
  teams: Team[];
};

interface TournamentTeamsProps {
  categories: CategoryTeams[];
}

const status: Record<TeamStatus, string> = {
  cancelled: 'Cancelada',
  paid: 'Confirmada',
  pending: 'Pendente'
};

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

  const firstAndLastName = (name: string) => {
    const firstName = name.split(' ')[0];
    const lastName = name.split(' ').findLast(n => n);

    return `${firstName} ${lastName}`;
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
          content:
            categories[initialTab].teams.length === 0 ? (
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
                    <li key={team.id}>
                      <p>
                        {firstAndLastName(team.athletes[0].athlete.name)}
                        <span>e</span>{' '}
                        {firstAndLastName(team.athletes[1].athlete.name)}
                      </p>

                      <div>
                        <div className={styles.category}>{category.name}</div>
                      </div>

                      <div>
                        <div
                          className={[styles.status, styles[team.status]].join(
                            ' '
                          )}
                        >
                          {status[team.status]}
                        </div>
                      </div>
                    </li>
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
