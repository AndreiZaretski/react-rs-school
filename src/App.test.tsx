import { render, screen } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  it('renders App component', () => {
    render(<App />);
    expect(screen.getByRole('mainPage')).toBeInTheDocument();
  });
});
