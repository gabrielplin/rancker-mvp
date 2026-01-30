import { fireEvent, render, screen } from '@testing-library/react';
import { cloneElement, ReactElement, ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import TextFieldComponent from './text-field';

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  Controller: ({ render }: any) =>
    render({
      field: {
        onChange: jest.fn(),
        onBlur: jest.fn(),
        value: '',
        name: 'password',
        ref: jest.fn()
      },
      fieldState: {
        error: { message: 'This field is required' },
        invalid: true
      }
    })
}));

describe('TextFieldComponent', () => {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    const { control } = useForm();
    return (
      <form>{cloneElement(children as ReactElement, { control } as any)}</form>
    );
  };

  const renderComponent = (props = {} as any) => {
    render(
      <Wrapper>
        <TextFieldComponent
          label='Password'
          placeholder='Enter your password'
          type='password'
          name='password'
          {...props}
        />
      </Wrapper>
    );
  };

  it('should render the component with label and placeholder', () => {
    renderComponent();
    const label = screen.getByText('Password');
    const input = screen.getByPlaceholderText('Enter your password');

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  it('should toggle password visibility', () => {
    renderComponent();
    const toggleButton = screen.getByRole('button');
    const input = screen.getByPlaceholderText('Enter your password');

    // Initially, the password should be hidden
    expect(input).toHaveAttribute('type', 'password');

    // Click the button to show the password
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'text');

    // Click the button again to hide the password
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'password');
  });

  it('should render an error message when control provides an error', () => {
    render(
      <Wrapper>
        <TextFieldComponent
          label='Password'
          placeholder='Enter your password'
          type='password'
          name='password'
          control={{
            getValues: jest.fn(),
            setValue: jest.fn(),
            register: jest.fn(),
            fieldState: {
              error: { message: 'This field is required' },
              invalid: true
            }
          }}
        />
      </Wrapper>
    );

    const errorMessage = screen.getByText('This field is required');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('text-field__error');
  });

  it('should not render the toggle button if type is not password', () => {
    renderComponent({
      type: 'text'
    });

    const toggleButton = screen.queryByRole('button');
    expect(toggleButton).not.toBeInTheDocument();
  });
});
