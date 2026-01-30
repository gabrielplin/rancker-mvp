import { ButtonHTMLAttributes } from 'react';

export type ButtonProps = {
  /** button type on a form*/
  type?: 'submit' | 'button';
  /** Is this the principal call to action on the page? */
  primary?: boolean;
  /** Is this the principal call to action on the page? */
  full?: boolean;
  /** How wide should the button be? */
  size?: 'small' | 'medium' | 'large';
  /** Button style */
  variant?: 'default' | 'outline';
  /** Button contents */
  label: string;
  /** Button contents */
  startIcon?: React.JSX.Element;
  /** Optional click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;
