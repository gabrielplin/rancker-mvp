import { ButtonProps } from '../../types';
import './button.styles.scss';
import clsx from 'clsx';

/** Primary UI component for user interaction */
function ButtonComponent({
  primary = false,
  variant = 'default',
  size = 'medium',
  type,
  full,
  label,
  startIcon,
  ...props
}: ButtonProps) {
  const mode: string = primary
    ? 'storybook-button--primary'
    : 'storybook-button--secondary';

  const varianType = variant === 'outline' ? `${mode}-outline` : mode;

  const fullClass = full ? 'storybook-button__full' : '';

  return (
    <button
      type={type}
      className={clsx(
        'storybook-button',
        `storybook-button--${size}`,
        mode,
        fullClass,
        varianType,
        props.className
      )}
      {...props}
    >
      {startIcon}
      {label}
    </button>
  );
}

export default ButtonComponent;
