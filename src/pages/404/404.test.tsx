import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import {
  MemoryRouter,
  RouterProvider,
  createMemoryRouter,
} from 'react-router-dom';
import NotFoundPage from '.';
import MainPage from '../MainPage/MainPage';
import React from 'react';

describe('<NotFoundPage />', () => {
  it('Should be defined', () => {
    expect(<NotFoundPage />).toBeDefined();
  });

  it('Ensure that the 404 page is displayed when navigating to an invalid route', async () => {
    const routes = [
      {
        element: <MainPage />,
        path: '/beer',
      },
      {
        element: <NotFoundPage />,
        path: '*',
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/foo'],
    });

    render(<RouterProvider router={router} />);
    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByText('Back')).toBeInTheDocument();
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
