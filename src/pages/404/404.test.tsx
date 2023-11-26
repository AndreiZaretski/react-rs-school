import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NotFoundPage from '.';

vi.mock('next/router', () => require('next-router-mock'));

describe('<NotFoundPage />', () => {
  it('Should be defined', () => {
    expect(<NotFoundPage />).toBeDefined();
  });

  it('Ensure that the 404 page is displayed when navigating to an invalid route', async () => {
    render(<NotFoundPage />);
    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByText('Back')).toBeInTheDocument();
  });

  it('Should be navigate a the beer page after click', async () => {
    render(<NotFoundPage />);

    const buttonBack = screen.getByRole('back');

    const notFountPage = await screen.findByText('Page not found');

    fireEvent.click(buttonBack);

    waitFor(() => {
      expect(notFountPage).not.toBeInTheDocument();
    });
  });
});
