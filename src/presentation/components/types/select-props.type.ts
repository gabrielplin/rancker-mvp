import { FocusEventHandler } from 'react';

export type SelectOption<T extends string> = {
  label: string;
  value: T;
};

export type SelectInputProps<T extends string> = {
  options: SelectOption<T>[];
  placeholder?: string;
  name: string;
  value?: T;
  onChange?: (value: T) => void;
  onBlur?: FocusEventHandler<HTMLSelectElement>;
  errorMessage?: string;
  label: string;
};
