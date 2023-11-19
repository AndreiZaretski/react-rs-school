import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';

describe('<NotFoundPage />', () => {
  it('Should be defined', () => {
    expect(<NotFoundPage />).toBeDefined();
  });

  it('Should be navigate a the beer page after click', async () => {
    render(
      <MemoryRouter initialEntries={['/foo']}>
        <NotFoundPage />
      </MemoryRouter>
    );

    const buttonBack = screen.getByRole('back');
    fireEvent.click(buttonBack);

    const notFountPage = await screen.findByText('Page not found');

    waitFor(() => {
      expect(notFountPage).not.toBeInTheDocument();
    });
  });
});
