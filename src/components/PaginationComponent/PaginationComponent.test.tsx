import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PaginationComponent from './PaginationComponent';
import { Context } from '../../constants/context';
import { mockContext } from '../../mock/mockContext';

describe('<PaginationComponent />', () => {
  const renderPagination = () => {
    return render(
      <MemoryRouter initialEntries={['/beer?page=1']}>
        <Context.Provider value={mockContext()}>
          <PaginationComponent />
        </Context.Provider>
      </MemoryRouter>
    );
  };

  const pageNumber = '1';
  it('Make sure the component updates URL query parameter when page changes', () => {
    renderPagination();
    const nextButton = screen.getByText('next');
    fireEvent.click(nextButton);
    waitFor(() => {
      expect(window.location.search).toBe('?page=2');
      expect(pageNumber).toBe('2');
    });
    const prevButton = screen.getByText('prev');
    fireEvent.click(prevButton);
    waitFor(() => {
      expect(window.location.search).toBe('?page=1');
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
