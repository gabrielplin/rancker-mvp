import styles from './percentage.module.scss';

type PercentageProps = {
  value: number;
};

function PercentageComponent({ value }: PercentageProps) {
  return (
    <div className={styles.percentage__container}>
      <p className={styles.percentage__title}>{value}% das vagas preenchidas</p>

      <div className={styles.bar}>
        <div className={styles.indicator} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default PercentageComponent;
