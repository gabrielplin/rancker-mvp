import { ReactElement } from 'react';
import styles from './metric-card.module.scss';

type MetricType = 'weekly-revenue' | 'new-users' | 'tournaments-created';

type MetricCardProps = {
  type: MetricType;
  value: string;
};

interface MetricCardConfig {
  label: string;
  color: string;
  icon?: ReactElement;
}

function MetricCardComponent({ type, value }: MetricCardProps) {
  const metricCardConfig: Record<MetricType, MetricCardConfig> = {
    'weekly-revenue': {
      label: 'Arrecadado da semana',
      color: 'green'
    },
    'new-users': {
      label: 'Novos usuários',
      color: 'yellow'
    },
    'tournaments-created': {
      label: 'Torneios criados',
      color: 'purple'
    }
  };

  const metric = metricCardConfig[type];

  return (
    <div className={[styles.card, styles[metric.color]].join(' ')}>
      <div>
        <div className={styles.iconBox}></div>
      </div>

      <div>
        <p className={styles.label}>{metric.label}</p>
        <p className={styles.value}>{value}</p>
      </div>
    </div>
  );
}

export default MetricCardComponent;
