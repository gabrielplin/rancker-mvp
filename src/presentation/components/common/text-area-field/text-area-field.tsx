'use client';
import React from 'react';
import { Controller } from 'react-hook-form';
import './text-area-field.styles.scss';

type TextAreaProps = {
  label: string;
  placeholder?: string;
  name: string;
  control: any;
  maxLength?: number;
};

function TextAreaFieldComponent({
  label,
  placeholder,
  name,
  control,
  maxLength = 2000
}: TextAreaProps) {
  const fmt = (n: number) => new Intl.NumberFormat('pt-BR').format(n);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const count = field.value?.length ?? 0;
        return (
          <div className={`text-area ${error ? 'text-area--error' : ''}`}>
            <label htmlFor={name} className='text-area__label'>
              {label}
            </label>

            <textarea
              {...field}
              id={name}
              placeholder={placeholder}
              className='text-area__input'
              rows={4}
              maxLength={maxLength}
            />

            <div className='text-area__footer'>
              <span className='text-area__counter'>
                {fmt(count)}/{fmt(maxLength)}
              </span>
            </div>

            {error?.message && (
              <p className='text-area__error'>{error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
}

export default TextAreaFieldComponent;
