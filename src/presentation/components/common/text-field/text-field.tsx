'use client';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import './text-field.styles.scss';
import { ChooseEyeIcon } from '../../icons';
import { TextFieldProps } from '../../types';

function TextFieldComponent(props: TextFieldProps) {
  const {
    label,
    placeholder,
    type = 'text',
    name,
    control,
    maskFn,
    showError = true,
    autoComplete = 'off',
    rules,
    ...rest
  } = props;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error, invalid } }) => (
        <div className={`text-field ${error ? 'text-field--error' : ''}`}>
          <label htmlFor={name} className='text-field__label'>
            {label}
          </label>
          <div className='text-field__input-wrapper'>
            <input
              {...field}
              {...rest}
              id={name}
              placeholder={placeholder}
              className='text-field__input'
              type={type === 'password' && isPasswordVisible ? 'text' : type}
              value={maskFn ? maskFn(field.value || '') : (field.value ?? '')}
              onChange={e =>
                field.onChange(maskFn ? maskFn(e.target.value) : e.target.value)
              }
              autoComplete={autoComplete}
            />
            {type === 'password' && (
              <button
                type='button'
                className='text-field__toggle-password'
                onClick={togglePasswordVisibility}
              >
                <ChooseEyeIcon className='text-field__eye' />
              </button>
            )}
          </div>
          {showError && error?.message && (
            <p className='text-field__error'>{error.message}</p>
          )}
        </div>
      )}
    />
  );
}

export default TextFieldComponent;
