'use client';
import React, { RefCallback, useRef } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import './checkbox-group.styles.scss';
import { PlusCircleIcon } from '../../icons';

export type CheckboxGroupOption = {
  label: string;
  value: string;
  checked?: boolean;
};

type CheckboxGroupProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  options: CheckboxGroupOption[];
  allowAdd?: boolean;
  label?: string;
  enableTextInput?: boolean;
  disabled?: boolean;
  textPlaceholder?: string;
  addText?: string;
};

const makeId = () =>
  globalThis.crypto?.randomUUID?.() ??
  `${Date.now()}-${Math.random().toString(16).slice(2)}`;

function CheckboxGroupComponent<T extends FieldValues>({
  name,
  control,
  options,
  allowAdd = false,
  label,
  enableTextInput = true,
  disabled = false,
  textPlaceholder = 'Digite aqui...',
  addText = 'Adicionar'
}: CheckboxGroupProps<T>) {
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const setInputRef =
    (key: string): RefCallback<HTMLInputElement> =>
    el => {
      inputRefs.current[key] = el;
    };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={options as any}
      render={({ field }) => {
        const value = (field.value || []) as CheckboxGroupOption[];

        const toggleCheck = (valueKey: string) => {
          const next = value.map(o =>
            o.value === valueKey ? { ...o, checked: !o.checked } : o
          );
          field.onChange(next);
        };

        const setLabel = (key: string, label: string) => {
          const next = value.map(o => (o.value === key ? { ...o, label } : o));
          field.onChange(next);
        };

        const handleAdd = () => {
          const id = makeId();

          const current: CheckboxGroupOption[] = Array.isArray(field.value)
            ? field.value
            : [];

          const newOption: CheckboxGroupOption = {
            label: `Item ${value.length + 1}`,
            value: id,
            checked: false
          };

          field.onChange([...current, newOption]);

          requestAnimationFrame(() => {
            inputRefs.current[id]?.focus();
            inputRefs.current[id]?.select?.();
          });
        };

        return (
          <div className='checkbox-group'>
            {label && <p className='checkbox-group__label'>{label}</p>}

            {value.map(opt => {
              return (
                <div key={opt.value} className='checkbox-group__row'>
                  <label
                    className={`checkbox-group__item ${opt.checked ? 'checked' : ''} ${
                      disabled ? 'disabled' : ''
                    }`}
                  >
                    <input
                      type='checkbox'
                      className='checkbox-group__input'
                      value={opt.value}
                      checked={opt.checked}
                      disabled={disabled}
                      onChange={() => toggleCheck(opt.value)}
                    />
                    <span className='checkbox-group__box' aria-hidden='true'>
                      <CheckIcon className='checkbox-group__check' />
                    </span>
                    <input
                      ref={setInputRef(opt.value)}
                      type='text'
                      className='checkbox-group__label-input'
                      placeholder={textPlaceholder}
                      value={opt.label}
                      disabled={disabled || !enableTextInput}
                      onChange={e => setLabel(opt.value, e.target.value)}
                    />
                  </label>
                </div>
              );
            })}

            {allowAdd && (
              <button
                type='button'
                className='checkbox-group__add'
                onClick={handleAdd}
                disabled={disabled}
              >
                <PlusCircleIcon />
                {addText}
              </button>
            )}
          </div>
        );
      }}
    />
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox='0 0 24 24' width={24} height={24} {...props}>
      <path
        fill='currentColor'
        d='M9.0 16.2l-3.5-3.5 1.4-1.4 2.1 2.1 6.2-6.2 1.4 1.4z'
      />
    </svg>
  );
}

export default CheckboxGroupComponent;
