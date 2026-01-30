import { render, screen } from '@testing-library/react';
import React from 'react';
import { ButtonProps } from '~/architecture/presentation/components/types';
import ButtonComponent from './button';

describe('ButtonComponent', () => {
  const renderButton = (props: Partial<ButtonProps> = {}) =>
    render(<ButtonComponent label='Click Me' {...props} />);

  it('should render with default classes', () => {
    renderButton();

    const button = screen.getByText('Click Me');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('storybook-button');
    expect(button).toHaveClass('storybook-button--medium'); // Default size
    expect(button).toHaveClass('storybook-button--secondary'); // Default mode
  });

  it('should apply primary class when primary is true', () => {
    renderButton({ primary: true });

    const button = screen.getByText('Click Me');
    expect(button).toHaveClass('storybook-button--primary');
    expect(button).not.toHaveClass('storybook-button--secondary');
  });

  it('should apply size class based on size prop', () => {
    renderButton({ size: 'large' });

    const button = screen.getByText('Click Me');
    expect(button).toHaveClass('storybook-button--large');
  });

  it('should apply full class when full is true', () => {
    renderButton({ full: true });

    const button = screen.getByText('Click Me');
    expect(button).toHaveClass('storybook-button__full');
  });

  it('should render the correct button type', () => {
    renderButton({ type: 'submit' });

    const button = screen.getByText('Click Me');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('should propagate additional props', () => {
    renderButton({ 'data-testid': 'custom-button' } as any);

    const button = screen.getByTestId('custom-button');
    expect(button).toBeInTheDocument();
  });

  it('should render the label correctly', () => {
    renderButton({ label: 'Submit' });

    const button = screen.getByText('Submit');
    expect(button).toBeInTheDocument();
  });
});
