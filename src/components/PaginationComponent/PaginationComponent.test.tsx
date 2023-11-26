import {
  screen,
  fireEvent,
  waitFor,
  act,
  render,
} from '@testing-library/react';
import PaginationComponent from './PaginationComponent';
import { userEvent } from '@testing-library/user-event';
import mockRouter from 'next-router-mock';

vi.mock('next/router', () => require('next-router-mock'));

describe('<PaginationComponent />', () => {
  const testMemoryRouter = () => {
    render(<PaginationComponent dataLength={20} />);
  };
  const user = userEvent.setup();

  it('Make sure the component updates URL query parameter when page changes', async () => {
    testMemoryRouter();

    const nextButton = await screen.findByRole('next');
    await act(async () => await user.click(nextButton));

    await waitFor(() => {
      expect(mockRouter.asPath).toBe('/?page=2');
    });

    const prevButton = await screen.findByText('prev');
    await act(async () => await user.click(prevButton));
    await waitFor(() => {
      expect(mockRouter.asPath).toBe('/?page=1');
    });
  });

  it('should be ?page=1 after change select active', async () => {
    testMemoryRouter();
    const nextButton = screen.getByText('next');
    fireEvent.click(nextButton);
    await waitFor(() => {
      expect(mockRouter.asPath).toBe('/?page=2');
      expect(screen.getByText('2')).toBeInTheDocument();
    });

    const select = screen.getByLabelText('Elements per page');
    fireEvent.change(select, { target: { value: '10' } });
    await waitFor(() => {
      expect(mockRouter.asPath).toBe('/?page=1&per_page=10');
      expect(select).toHaveValue('10');
    });
  });

  it('should disable prev button on first page and next button on last page', () => {
    testMemoryRouter();
    const prevButton = screen.getByRole('prev');
    const nextButton = screen.getByRole('next');
    expect(prevButton).toBeDisabled();
    expect(nextButton).not.toBeDisabled();
  });
});
