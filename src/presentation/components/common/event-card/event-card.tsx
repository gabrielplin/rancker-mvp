'use client';
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/navigation';
import { ButtonTag } from '../button';
import styles from './event-card.module.scss';

interface EventCardProps {
  title: string;
  status: 'CLOSED' | 'OPENED';
  type: string;
  date: string;
  banner: string;
  slug?: string;
}

function EventCard({
  title,
  status,
  type,
  date,
  banner,
  slug
}: EventCardProps) {
  const route = useRouter();
  const startDateFormated = new Date(date);

  return (
    <div className={styles.card}>
      <div className={styles.card__header}>
        <span
          className={`${styles.badge}${status === 'CLOSED' ? '--white' : '--success'}`}
        >
          {status === 'CLOSED' ? 'Encerradas' : 'Abertas'}
        </span>
        <span className={styles.badge}>{type}</span>
      </div>
      <div className={styles.card__content}>
        <h3>{title}</h3>
        <span className={styles.card__description}>
          Inscreva-se até {startDateFormated.getDate()}
        </span>
      </div>
      <div className={styles.button__container}>
        <ButtonTag
          primary
          full
          variant={status === 'CLOSED' ? 'outline' : 'default'}
          label={status === 'CLOSED' ? 'Conferir torneio' : 'Fazer inscrição'}
          onClick={() => route.push(`/torneios/${slug}`)}
        />
      </div>
      <img className={styles.card__image} src={banner} />
    </div>
  );
}

export default EventCard;
