import clsx from 'clsx';
import { ChangeEvent } from 'react';
import './select.styles.scss';
import { SelectInputProps } from '../../types';

function SelectComponent<T extends string>({
  name,
  options,
  value,
  onChange,
  onBlur,
  placeholder,
  errorMessage,
  label
}: SelectInputProps<T>) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as T;
    onChange?.(value);
  };

  return (
    <div className='select-wrapper'>
      <label htmlFor={name} className='select-wrapper__label'>
        {label}
      </label>
      <select
        name={name}
        value={value || ''}
        className={clsx('select-input', errorMessage && 'has-error')}
        onChange={handleChange}
        onBlur={onBlur}
      >
        {placeholder && <option value=''>{placeholder}</option>}
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errorMessage && <p className='select-wrapper__error'>{errorMessage}</p>}
    </div>
  );
}

export default SelectComponent;
