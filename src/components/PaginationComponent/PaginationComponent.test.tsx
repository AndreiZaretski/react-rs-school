import {
  screen,
  fireEvent,
  waitFor,
  act,
  render,
} from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import PaginationComponent from './PaginationComponent';
import { userEvent } from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../redux/store/store';

const routes = [
  {
    path: '/beer',
    element: <PaginationComponent />,
  },
];

describe('<PaginationComponent />', () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ['/beer?page=1'],
    initialIndex: 0,
  });
  const testMemoryRouter = () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );
  };

  const user = userEvent.setup();

  const pageNumber = '1';
  it('Make sure the component updates URL query parameter when page changes', async () => {
    testMemoryRouter();

    const nextButton = await screen.findByRole('next');
    await act(async () => await user.click(nextButton));

    waitFor(() => {
      expect(router.state.location.search).toBe('?page=2');
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
    testMemoryRouter();
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
