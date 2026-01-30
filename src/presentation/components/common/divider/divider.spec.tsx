import { render, screen } from '@testing-library/react';
import React from 'react';
import DividerComponent from './divider';

describe('DividerComponent', () => {
  it('should render the container with the correct classes', () => {
    render(<DividerComponent />);

    const container = screen.getByRole('separator', { hidden: true });
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('divider-container');
    expect(container).toHaveClass('divider-horizontal');
  });

  it('should render children text when provided', () => {
    const childText = 'Divider Text';
    render(<DividerComponent>{childText}</DividerComponent>);

    const textElement = screen.getByText(childText);
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveClass('divider-text');
  });

  it('should not render children section when no children are provided', () => {
    render(<DividerComponent />);

    const textElement = screen.queryByText('Divider Text');
    expect(textElement).not.toBeInTheDocument();
  });
});
