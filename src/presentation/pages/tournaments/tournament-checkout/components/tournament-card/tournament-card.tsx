import { SVGProps } from 'react';
import styles from './tournament-card.module.scss';
import { ChevronRightIcon } from '~/presentation/components/icons';

type TournamentCardStatus =
  | 'available'
  | 'last_spots'
  | 'sold_out'
  | 'in_progress';

type TournamentCardProps = {
  id: string;
  title: string;
  deadline?: string;
  price?: number;
  installments?: string;
  checked?: boolean;
  status: TournamentCardStatus;

  onSelect?: (checked: boolean) => void;
  onViewPrize?: () => void;
  onViewProgress?: () => void;
};

const TournamentCardComponent = ({
  title,
  deadline,
  price,
  installments,
  checked = false,
  status,
  onSelect,
  onViewPrize,
  onViewProgress
}: TournamentCardProps) => {
  const isDisabled = status === 'sold_out';
  // const isSelectable = status === 'available' || status === 'last_spots';

  return (
    <div
      className={`${styles.card} ${styles[status]} ${
        checked ? styles.checked : ''
      }`}
    >
      <div className={styles.contentInside}>
        <label
          className={` ${
            checked ? styles.checked : ''
          } ${isDisabled ? styles.disabled : ''}`}
        >
          <input
            type='checkbox'
            checked={checked}
            value={price}
            disabled={isDisabled}
            onChange={e => onSelect?.(e.target.checked)}
            className={styles.checkbox}
          />
          <span className={styles.box} aria-hidden='true'>
            <CheckIcon className={styles.check} />
          </span>
        </label>
        <div className={styles.header}>
          {status === 'last_spots' && (
            <span className={styles.badge}>Últimas vagas</span>
          )}

          <h3 className={styles.title}>{title}</h3>

          {deadline && <p className={styles.deadline}>{deadline}</p>}

          <span className={styles.viewPrize} onClick={onViewPrize}>
            Ver premiação
          </span>
        </div>
      </div>

      <div className={styles.actions}>
        {price && (
          <div className={styles.price}>
            <strong>R$ {price.toFixed(2)}</strong>
            {installments && <span>{installments}</span>}
          </div>
        )}
        {status === 'sold_out' && (
          <span className={styles.badgeSoldOut}>Esgotado</span>
        )}
        {status === 'in_progress' && (
          <span className={styles.progress} onClick={onViewProgress}>
            Conferir andamento <ChevronRightIcon />
          </span>
        )}
      </div>
    </div>
  );
};

function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox='0 0 24 24' width={24} height={24} {...props}>
      <path
        fill='#28272c'
        d='M9.0 16.2l-3.5-3.5 1.4-1.4 2.1 2.1 6.2-6.2 1.4 1.4z'
      />
    </svg>
  );
}

export default TournamentCardComponent;
