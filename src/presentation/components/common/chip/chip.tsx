'use client';

import { HTMLAttributes, ReactNode } from 'react';
import styles from './chip.module.scss';

type BaseProps = Omit<
  HTMLAttributes<HTMLDivElement | HTMLButtonElement>,
  'children'
> & {
  icon: ReactNode;
  children: ReactNode;
  size?: 'sm' | 'md';
  muted?: boolean;
  rounded?: 'lg' | 'full';
  onClick?: () => void;
};

function ChipComponent({
  icon,
  children,
  className,
  size = 'md',
  muted = false,
  rounded = 'lg',
  onClick,
  ...rest
}: BaseProps) {
  const classes = [
    styles.chip,
    styles[`chip--${size}`],
    styles[`chip--${rounded}`],
    muted && styles['chip--muted'],
    className
  ]
    .filter(Boolean)
    .join(' ');

  if (onClick) {
    return (
      <button type='button' className={classes} onClick={onClick} {...rest}>
        <span className={styles.chip__icon} aria-hidden>
          {icon}
        </span>
        <span className={styles.chip__label}>{children}</span>
      </button>
    );
  }

  return (
    <div className={classes} {...rest}>
      <span className={styles.chip__icon} aria-hidden>
        {icon}
      </span>
      <span className={styles.chip__label}>{children}</span>
    </div>
  );
}

export default ChipComponent;
