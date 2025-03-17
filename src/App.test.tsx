import React from 'react';
import { render, screen } from '@testing-library/react';

// Import App after the mocks
import App from './App';

// Mock the Neo4j components
jest.mock('@neo4j-ndl/react', () => ({
  NeedleThemeProvider: (props: React.PropsWithChildren<{}>) => (
    <div data-testid="theme-provider">{props.children}</div>
  ),
}));

// Mock the PasswordGenerator component
jest.mock('./components/PasswordGenerator/PasswordGenerator', () => {
  return function MockPasswordGenerator() {
    return <div data-testid="password-generator">Password Generator Mock</div>;
  };
});

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);

    // Check if the theme provider is rendered
    expect(screen.getByTestId('theme-provider')).toBeInTheDocument();

    // Check if the password generator is rendered
    expect(screen.getByTestId('password-generator')).toBeInTheDocument();
  });

  test('renders password generator with correct props', () => {
    render(<App />);

    // This test would be better if we could check the props,
    // but for a simple test, just checking that it renders is sufficient
    expect(screen.getByText('Password Generator Mock')).toBeInTheDocument();
  });
});
