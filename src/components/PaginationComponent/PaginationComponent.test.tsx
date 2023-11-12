import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PaginationComponent from './PaginationComponent';
import { Context } from '../../constants/context';
import { mockContext } from '../../mock/mockContext';

describe('<PaginationComponent />', () => {
  const RenderPagination = (props: {
    pageNumber: string;
    setPageNumber: (value: string) => void;
    limit: string;
    setLimit: (value: string) => void;
  }) => {
    const { pageNumber, setPageNumber, limit, setLimit } = props;
    return render(
      <MemoryRouter initialEntries={['/beer?page=1']}>
        <Context.Provider
          value={mockContext(
            [],
            false,
            pageNumber,
            setPageNumber,
            limit,
            setLimit
          )}
        >
          <PaginationComponent />
        </Context.Provider>
      </MemoryRouter>
    );
  };

  let pageNumber = '1';
  let limit = '20';
  const setPageNumber = (value: string) => {
    pageNumber = value;
  };
  const setLimit = (value: string) => {
    limit = value;
  };
  it('Make sure the component updates URL query parameter when page changes', () => {
    RenderPagination({ pageNumber, setPageNumber, limit, setLimit });
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
    RenderPagination({ pageNumber, setPageNumber, limit, setLimit });
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
});
