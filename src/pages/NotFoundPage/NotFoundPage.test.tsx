import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';

describe('<NotFoundPage />', () => {
  it('Should be defined', () => {
    expect(<NotFoundPage />).toBeDefined();
  });

  it('Ensure that the 404 page is displayed when navigating to an invalid route', () => {
    render(
      <MemoryRouter initialEntries={['/foo']}>
        <NotFoundPage />
      </MemoryRouter>
    );
    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByText('Back')).toBeInTheDocument();
  });

  it('Should be navigate a the beer page after click', () => {
    render(
      <MemoryRouter initialEntries={['/foo']}>
        <NotFoundPage />
      </MemoryRouter>
    );

    const buttonBack = screen.getByRole('back');
    fireEvent.click(buttonBack);

    const notFountPage = screen.getByText('Page not found');

    waitFor(() => {
      expect(notFountPage).not.toBeInTheDocument();
    });
  });
});
