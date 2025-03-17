import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PasswordGenerator from './PasswordGenerator';
import { SliderProps } from '../../types';
import { ButtonProps, TextInputProps, ClipboardButtonProps } from '@neo4j-ndl/react';

// Define interface for CheckboxProps (not showing in needle/react)
interface CheckboxProps {
  label: string;
  isChecked: boolean;
  onClick: () => void;
  htmlAttributes?: Record<string, string>;
}

// Mock the neo4j-ndl/react components
jest.mock('@neo4j-ndl/react', () => ({
  Button: ({ children, onClick }: ButtonProps) => (
    <button onClick={onClick} data-testid="mock-button">
      {children}
    </button>
  ),
  Checkbox: ({ label, isChecked, onClick }: CheckboxProps) => (
    <label>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onClick}
        data-testid={`checkbox-${label}`}
      />
      {label}
    </label>
  ),
  TextInput: ({ value, isReadOnly, placeholder, htmlAttributes }: TextInputProps) => (
    <input
      type="text"
      value={value}
      readOnly={isReadOnly}
      placeholder={placeholder}
      aria-label={htmlAttributes?.['aria-label']}
      data-testid="mock-text-input"
    />
  ),
  useCopyToClipboard: () => [null, jest.fn()],
  toast: {
    danger: jest.fn(),
    success: jest.fn(),
    info: jest.fn(),
    warning: jest.fn(),
  },
  Toaster: () => <div data-testid="mock-toaster" />,
  ClipboardButton: ({ textToCopy, htmlAttributes }: ClipboardButtonProps) => (
    <button data-testid="mock-clipboard-button" aria-label={htmlAttributes?.['aria-label']}>
      Copy
    </button>
  ),
}));

// Mock the CustomSlider component
jest.mock('../CustomSlider/CustomSlider', () => {
  return function MockSlider({ value, onChange, min, max, ariaLabel }: SliderProps) {
    return (
      <input
        type="range"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        max={max}
        aria-label={ariaLabel}
        data-testid="custom-slider"
      />
    );
  };
});

describe('PasswordGenerator Component', () => {
  test('renders without crashing', () => {
    render(<PasswordGenerator />);
    expect(screen.getByText(/Password Generator/i)).toBeInTheDocument();
  });

  test('updates password length when slider is changed', () => {
    render(<PasswordGenerator />);
    const slider = screen.getByTestId('custom-slider') as HTMLInputElement;
    fireEvent.change(slider, { target: { value: '16' } });
    expect(slider.value).toBe('16');
    expect(screen.getByText('16')).toBeInTheDocument();
  });

  test('toggles checkboxes', () => {
    render(<PasswordGenerator />);
    const uppercaseCheckbox = screen.getByTestId(
      'checkbox-Include Uppercase Letters',
    ) as HTMLInputElement;
    const lowercaseCheckbox = screen.getByTestId(
      'checkbox-Include Lowercase Letters',
    ) as HTMLInputElement;
    const symbolsCheckbox = screen.getByTestId('checkbox-Include Symbols') as HTMLInputElement;

    expect(uppercaseCheckbox.checked).toBe(true);
    expect(lowercaseCheckbox.checked).toBe(true);
    expect(symbolsCheckbox.checked).toBe(false);

    fireEvent.click(symbolsCheckbox);
    expect(symbolsCheckbox.checked).toBe(true);
  });

  test('generates a password when button is clicked', async () => {
    render(<PasswordGenerator />);
    const button = screen.getByTestId('mock-button');
    const passwordInput = screen.getByTestId('mock-text-input') as HTMLInputElement;

    // Initial state - empty password
    expect(passwordInput.value).toBe('');

    // Click the generate button
    fireEvent.click(button);

    // Expect a password has been generated
    expect(passwordInput.value).not.toBe('');
  });

  test('shows vulnerability warning for short passwords', () => {
    // We can't re-mock in the test itself, so we'll spy on the existing mock
    const dangerSpy = jest.spyOn(require('@neo4j-ndl/react').toast, 'danger');

    render(<PasswordGenerator minLength={4} defaultLength={6} />);
    const button = screen.getByTestId('mock-button');

    // Generate password with length below 8
    fireEvent.click(button);

    // Check if toast warning was displayed
    expect(dangerSpy).toHaveBeenCalledWith(
      'Vulnerable password, please use it carefully',
      expect.anything(),
    );

    // Clean up the spy
    dangerSpy.mockRestore();
  });
});
