import {
  ChangeEventHandler,
  FocusEventHandler,
  HTMLInputAutoCompleteAttribute
} from 'react';
import { FieldValues, RegisterOptions } from 'react-hook-form';

export type TextFieldProps = {
  /** Label text displayed above the input field */
  label: string;

  /** Placeholder text displayed above the input field */
  placeholder?: string;

  /** Defines the type of the input field: text or password */
  type?: 'text' | 'password' | 'date';

  /** Name of the field, used as an identifier in React Hook Form */
  name: string;

  /** Control provided by React Hook Form */
  control: any; // Control<FieldValues>: Typically `Control<FieldValues>` from React Hook Form;

  onBlur?: FocusEventHandler<any> | undefined;
  onChange?: ChangeEventHandler<any> | undefined;

  maskFn?: (value: string) => string;

  showError?: boolean;

  rules?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
      >
    | undefined;

  autoComplete?: HTMLInputAutoCompleteAttribute;
};
