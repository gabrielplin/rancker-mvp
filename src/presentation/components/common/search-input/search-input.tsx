'use client';
import { Controller } from 'react-hook-form';
import './search-input.styles.scss';
import { SearchIcon } from '../../icons';
import { SearchInputProps } from '../../types';

function SearchInputComponent(props: SearchInputProps) {
  const {
    label,
    placeholder,
    name,
    control,
    showError = true,
    autoComplete = 'off',
    ...rest
  } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={`search-input ${error ? 'search-input--error' : ''}`}>
          <label htmlFor={name} className='search-input__label'>
            {label}
          </label>
          <div className='search-input__input-wrapper'>
            <SearchIcon />
            <input
              {...field}
              {...rest}
              id={name}
              placeholder={placeholder}
              className='search-input__input'
              type={'text'}
              value={field.value}
              onChange={e => field.onChange(e.target.value)}
              autoComplete={autoComplete}
            />
          </div>
          {showError && error?.message && (
            <p className='search-input__error'>{error.message}</p>
          )}
        </div>
      )}
    />
  );
}

export default SearchInputComponent;
