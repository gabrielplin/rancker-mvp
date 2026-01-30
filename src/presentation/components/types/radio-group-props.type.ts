import { UseFormRegisterReturn } from 'react-hook-form';

type RadioOption<T extends string> = {
  label: string;
  value: T;
  team?: {
    image: string;
    name: string;
    username: string;
  };
};

export type RadioGroupProps<T extends string> = {
  options: RadioOption<T>[];
  name: string;
  defaultValue?: T;
  onChange?: (value: T) => void;
  register?: UseFormRegisterReturn;
  errorMessage?: string;
  value?: string;
};
