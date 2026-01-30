'use client';

import clsx from 'clsx';
import { JSX } from 'react';
import styles from './alert.module.scss';

type Variant = 'error' | 'warning' | 'success' | 'info' | 'neutral';

type AlertProps = {
  variant?: Variant;
  title?: string;
  description?: string;
  className?: string;
  dataTestId?: string;
};

const icons: Record<Variant, JSX.Element> = {
  error: (
    <svg viewBox='0 0 24 24' aria-hidden='true'>
      <circle cx='12' cy='12' r='10' />
      <path d='M12 7v6M12 17h.01' strokeWidth='2' strokeLinecap='round' />
    </svg>
  ),
  warning: (
    <svg viewBox='0 0 24 24' aria-hidden='true'>
      <path d='M12 3L2 21h20L12 3z' />
      <path d='M12 9v5M12 17h.01' strokeWidth='2' strokeLinecap='round' />
    </svg>
  ),
  success: (
    <svg viewBox='0 0 24 24' aria-hidden='true'>
      <circle cx='12' cy='12' r='10' />
      <path
        d='M8 12l3 3 5-6'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  ),
  info: (
    <svg viewBox='0 0 24 24' aria-hidden='true'>
      <circle cx='12' cy='12' r='10' />
      <path d='M12 10v6M12 8h.01' strokeWidth='2' strokeLinecap='round' />
    </svg>
  ),
  neutral: (
    <svg viewBox='0 0 24 24' aria-hidden='true'>
      <circle cx='12' cy='12' r='10' />
      <path d='M8 12h8' strokeWidth='2' strokeLinecap='round' />
    </svg>
  )
};

function AlertComponent({
  variant = 'neutral',
  title,
  description,
  className,
  dataTestId
}: AlertProps) {
  const hasDescription = Boolean(description);

  return (
    <div
      role='alert'
      aria-live='polite'
      className={clsx(
        styles.alert,
        styles[`alert--${variant}`],
        hasDescription && styles['alert--has-description'],
        className
      )}
      data-testid={dataTestId}
    >
      <div className={styles['alert__icon']} aria-hidden='true'>
        {icons[variant]}
      </div>

      <div className={styles['alert__content']}>
        {title && <h4 className={styles['alert__title']}>{title}</h4>}
        {hasDescription && (
          <p className={styles['alert__description']}>{description}</p>
        )}
      </div>
    </div>
  );
}

export default AlertComponent;
