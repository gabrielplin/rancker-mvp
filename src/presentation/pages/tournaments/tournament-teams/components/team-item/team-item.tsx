import { ChevronDownIcon } from '~/presentation/components/icons';
import { CategoryTeams, Team, TeamStatus } from '../../tournament-teams';
import styles from './team-item.module.scss';
import { useState } from 'react';
import { useIsMobile } from '~/presentation/hooks/globals';
import { Span } from 'next/dist/trace';
import { ModalTag } from '~/presentation/components/common';

interface TeamItemProps {
  team: Team;
  category: CategoryTeams;
}

const status: Record<TeamStatus, string> = {
  cancelled: 'Cancelada',
  paid: 'Confirmada',
  pending: 'Pendente'
};

const firstAndLastName = (name: string) => {
  const firstName = name.split(' ')[0];
  const lastName = name.split(' ').findLast(n => n);

  return `${firstName} ${lastName}`;
};

const TeamItemComponent = ({ team, category }: TeamItemProps) => {
  const [contentVisible, setContentVisible] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const isMobile = useIsMobile();

  return (
    <>
      <li
        key={team.id}
        className={[
          styles.teamItem,
          contentVisible && styles.itemFullVisible
        ].join(' ')}
      >
        <div className={styles.contentVisible}>
          <p>
            {firstAndLastName(team.athletes[0].athlete.name)}
            <span>e</span> {firstAndLastName(team.athletes[1].athlete.name)}
          </p>

          <div>
            <div className={styles.category}>
              {category.name}{' '}
              {isMobile && <span onClick={() => setModal(true)}>Ver mais</span>}
            </div>
          </div>

          <div className={styles.statusItem}>
            <div className={[styles.status, styles[team.status]].join(' ')}>
              {status[team.status]}
            </div>

            <div
              onClick={() => setContentVisible(!contentVisible)}
              className={[
                styles.contentIcon,
                contentVisible && styles.visible
              ].join(' ')}
            >
              <ChevronDownIcon />
            </div>
          </div>
        </div>

        {contentVisible && <InfoTeam category={category} team={team} />}
      </li>

      <ModalTag onClose={() => setModal(false)} open={modal}>
        <InfoTeam category={category} team={team} />
      </ModalTag>
    </>
  );
};

const InfoTeam = ({ category, team }: TeamItemProps) => {
  return (
    <div className={styles.contentHiden}>
      <div className={styles.player01}>
        <span>
          <strong>Nome:</strong> {team.athletes[0].athlete.name}
        </span>
        <span>
          <strong>Instagram:</strong> {team.athletes[0].athlete.instagram}
        </span>
        <span>
          <strong>E-mail:</strong> {team.athletes[0].athlete.email}
        </span>
        <span>
          <strong>Whatsapp:</strong> {team.athletes[0].athlete.phone}
        </span>
        <span>
          <strong>Uniforme:</strong> {team.athletes[0].athlete.uniformSize}
        </span>
      </div>
      <div className={styles.player02}>
        <span>
          <strong>Nome:</strong> {team.athletes[1].athlete.name}
        </span>
        <span>
          <strong>Instagram:</strong> {team.athletes[1].athlete.instagram}
        </span>
        <span>
          <strong>E-mail:</strong> {team.athletes[1].athlete.email}
        </span>
        <span>
          <strong>Whatsapp:</strong> {team.athletes[1].athlete.phone}
        </span>
        <span>
          <strong>Uniforme:</strong> {team.athletes[1].athlete.uniformSize}
        </span>
      </div>
    </div>
  );
};

export default TeamItemComponent;
