import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PaginationComponent from './PaginationComponent';

import { userEvent } from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../redux/store/store';

describe('<PaginationComponent />', () => {
  const renderPagination = () => {
    return render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/beer?page=1']}>
          <PaginationComponent />
        </MemoryRouter>
      </Provider>
    );
  };

  userEvent.setup();

  const pageNumber = '1';
  it('Make sure the component updates URL query parameter when page changes', async () => {
    renderPagination();
    const nextButton = screen.getByRole('next');
    await act(async () => await userEvent.click(nextButton));
    waitFor(() => {
      console.log('LOCATIONNN', location.search);
      expect(location.search).toBe('?page=2');
      expect(pageNumber).toBe('2');
    });
    const prevButton = screen.getByText('prev');
    fireEvent.click(prevButton);
    waitFor(() => {
      expect(location.search).toBe('?page=1');
      expect(pageNumber).toBe('1');
    });
  });

  it('should be ?page=1 after change select active', () => {
    renderPagination();
    const nextButton = screen.getByText('next');
    fireEvent.click(nextButton);
    waitFor(() => {
      expect(window.location.search).toBe('?page=2');
      expect(screen.getByText('2')).toBeInTheDocument();
    });

    const select = screen.getByLabelText('Elements per page');
    fireEvent.change(select, { target: { value: '10' } });
    waitFor(() => {
      expect(window.location.search).toBe('?page=1');
      expect(window.location.search).toBe('?limit=10');
      expect(select).toHaveValue('10');
    });
  });

  it('should disable prev button on first page and next button on last page', () => {
    renderPagination();
    const prevButton = screen.getByRole('prev');
    const nextButton = screen.getByRole('next');
    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
  });
});
