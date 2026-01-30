import {
  ChangeEventHandler,
  FocusEventHandler,
  HTMLInputAutoCompleteAttribute
} from 'react';

export type SearchInputProps = {
  label: string;
  placeholder?: string;
  type: 'text';
  name: string;
  control: any;
  onBlur?: FocusEventHandler<any> | undefined;
  onChange?: ChangeEventHandler<any> | undefined;
  showError?: boolean;
  autoComplete?: HTMLInputAutoCompleteAttribute;
};
