import clsx from 'clsx';
import { ReactNode } from 'react';
import styles from './select-card.module.scss';

type SelectCardProps = {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  disabled?: boolean;
  className?: string;
};

function SelectCardComponent({
  name,
  value,
  checked,
  onChange,
  icon,
  title,
  subtitle,
  disabled,
  className
}: SelectCardProps) {
  return (
    <label
      className={clsx(
        styles['select-card'],
        checked && styles['select-card--checked'],
        disabled && styles['select-card--disabled'],
        className
      )}
      aria-disabled={disabled}
    >
      <input
        type='radio'
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        disabled={disabled}
        className={styles['select-card__input']}
      />

      {icon && <span className={styles['select-card__icon']}>{icon}</span>}

      <div className={styles['select-card__content']}>
        <span className={styles['select-card__title']}>{title}</span>
        {subtitle && (
          <span className={styles['select-card__subtitle']}>{subtitle}</span>
        )}
      </div>
    </label>
  );
}

export default SelectCardComponent;
