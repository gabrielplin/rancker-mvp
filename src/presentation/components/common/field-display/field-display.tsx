import { HTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import styles from './field-display.module.scss';

type FieldDisplayProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    title?: string;
    icon: ReactNode;
    value: ReactNode;
  }
>;

function FieldDisplayComponent({
  title,
  icon,
  value,
  className,
  ...props
}: FieldDisplayProps) {
  const classes = [styles.field, className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      <div className={styles.field__icon} aria-hidden>
        {icon}
      </div>

      <div className={styles.field__body}>
        {title && <span className={styles.field__title}>{title}</span>}

        <div className={styles.field__value}>{value}</div>
      </div>
    </div>
  );
}

export default FieldDisplayComponent;
