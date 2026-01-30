import styles from './category-status-card.module.scss';
import { PercentageTag } from './components';

type CategoryStatusCardProps = {
  title: string;
  date: string;
  time: string;
  location: string;
  filledPercentage: number;
  link: string;
};

function CategoryStatusCardComponent({
  title,
  date,
  time,
  location,
  filledPercentage
}: CategoryStatusCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <p>
            {date} às {time}
          </p>
        </div>
        <div>
          <p>{location}</p>
        </div>
      </div>

      <div className={styles.card__content}>
        <p className={styles.title}>{title}</p>

        <PercentageTag value={filledPercentage} />

        <div className={styles.buttonGroup}>
          <button className={styles.button__details}>Mais detalhes</button>

          <button className={styles.button__copy}>Copiar link</button>
        </div>
      </div>
    </div>
  );
}

export default CategoryStatusCardComponent;
