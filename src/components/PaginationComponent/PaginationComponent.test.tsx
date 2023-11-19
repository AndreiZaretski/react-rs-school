import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import PaginationComponent from './PaginationComponent';
import { userEvent } from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../redux/store/store';

describe('<PaginationComponent />', () => {
  const testMemoryRouter = () => {
    const router = createMemoryRouter(
      [
        {
          path: '/beer',
          element: <PaginationComponent />,
        },
      ],
      {
        initialEntries: ['/beer?page=1'],
        initialIndex: 0,
      }
    );

    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );
    return { router };
  };

  const user = userEvent.setup();

  const pageNumber = '1';
  it('Make sure the component updates URL query parameter when page changes', async () => {
    const { router } = testMemoryRouter();

    const nextButton = await screen.findByRole('next');
    fireEvent.click(nextButton);
    waitFor(() => {
      expect(router.state.location.search).toBe('2');
      expect(pageNumber).toBe('2');
    });
    const prevButton = await screen.findByText('prev');
    await act(async () => await user.click(prevButton));
    await waitFor(() => {
      expect(router.state.location.search).toBe('?page=1');
      expect(pageNumber).toBe('1');
    });
  });

  it('should be ?page=1 after change select active', async () => {
    const { router } = testMemoryRouter();
    const nextButton = screen.getByText('next');
    fireEvent.click(nextButton);
    await waitFor(() => {
      expect(router.state.location.search).toBe('?page=1');
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    const select = screen.getByLabelText('Elements per page');
    fireEvent.change(select, { target: { value: '10' } });
    await waitFor(() => {
      expect(router.state.location.search).toBe('?page=1');
      expect(select).toHaveValue('10');
    });
  });

  it('should disable prev button on first page and next button on last page', () => {
    testMemoryRouter();
    const prevButton = screen.getByRole('prev');
    const nextButton = screen.getByRole('next');
    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
  });
});
