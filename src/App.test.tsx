import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';

describe('<App />', () => {
  it('renders App component', () => {
    render(<App />);
    expect(screen.getByRole('mainPage')).toBeInTheDocument();
  });
});
