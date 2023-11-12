import { render, screen } from '@testing-library/react';
import ErrorPage from './ErrorPage';

describe('<ErrorPage />', () => {
  it('renders ErrorPage component when error occurs', () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };
    render(
      <ErrorPage>
        <ThrowError />
      </ErrorPage>
    );
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/test error/i)).toBeInTheDocument();
  });
});
