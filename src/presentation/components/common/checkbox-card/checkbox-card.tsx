import { ChangeEventHandler, RefCallback, SVGProps } from 'react';
import styles from './checkbox-card.module.scss';

type CheckboxCardProps = {
  value: string;
  label: string;
  checked: boolean;
  textPlaceholder?: string;
  enableTextInput?: boolean;
  disabled?: boolean;
  onCheck?: (value: boolean) => void;
  onTextChange?: (value: string) => void;
  onInputRef?: (key: string) => RefCallback<HTMLInputElement>;
};

function CheckboxCardComponent({
  value,
  label,
  checked,
  disabled,
  textPlaceholder = '',
  enableTextInput = false,
  onCheck,
  onTextChange,
  onInputRef
}: CheckboxCardProps) {
  const handleCheck: ChangeEventHandler<HTMLInputElement> = e => {
    onCheck?.(e.target.checked);
  };

  const handleTextChange: ChangeEventHandler<HTMLInputElement> = e => {
    onTextChange?.(e.target.value);
  };

  const handleSetInputRef =
    (key: string): RefCallback<HTMLInputElement> =>
    _el => {
      onInputRef?.(key);
    };

  return (
    <div className={styles['checkbox-card']}>
      <label
        className={`${styles['checkbox-card__item']} ${
          checked ? styles['checked'] : ''
        } ${disabled ? styles['disabled'] : ''}`}
      >
        <input
          type='checkbox'
          className={styles['checkbox-card__input']}
          value={value}
          checked={checked}
          disabled={disabled}
          onChange={handleCheck}
        />
        <span className={styles['checkbox-card__box']} aria-hidden='true'>
          <CheckIcon className={styles['checkbox-card__check']} />
        </span>
        <input
          ref={handleSetInputRef(value)}
          type='text'
          className={styles['checkbox-card__label-input']}
          placeholder={textPlaceholder}
          value={label}
          disabled={disabled || !enableTextInput}
          onChange={handleTextChange}
        />
      </label>
    </div>
  );
}

function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox='0 0 24 24' width={24} height={24} {...props}>
      <path
        fill='currentColor'
        d='M9.0 16.2l-3.5-3.5 1.4-1.4 2.1 2.1 6.2-6.2 1.4 1.4z'
      />
    </svg>
  );
}

export default CheckboxCardComponent;
