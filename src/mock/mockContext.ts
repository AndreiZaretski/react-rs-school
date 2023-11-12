import { BeerContextType } from '../constants/context';
import { BeerSort } from '../types/response-interface';

export const mockContext = (
  mockDataTest?: BeerSort[],
  loading?: boolean,
  pageNumber?: string,
  setPageNumber?: (value: string) => void,
  limit?: string,
  setLimit?: (value: string) => void
): BeerContextType => {
  return {
    data: mockDataTest || [],
    setData: () => {},
    isLoading: loading || false,
    setIsLoading: () => {},
    hasError: false,
    setHasError: () => {},
    pageNumber: pageNumber || '1',
    setPageNumber: setPageNumber || (() => {}),
    limit: limit || '20',
    setLimit: setLimit || (() => {}),
    searchValue: '',
    setSearchValue: () => {},
  };
};
