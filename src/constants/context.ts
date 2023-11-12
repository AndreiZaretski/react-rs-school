import { createContext } from 'react';
import { BeerSort } from '../types/response-interface';

export interface BeerContextType {
  data: BeerSort[];
  setData: (data: BeerSort[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  hasError: boolean;
  setHasError: (hasError: boolean) => void;
  pageNumber: string;
  setPageNumber: (pageNumber: string) => void;
  limit: string;
  setLimit: (limit: string) => void;
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
}

export const Context = createContext<BeerContextType>({
  data: [],
  setData: () => {},
  isLoading: false,
  setIsLoading: () => {},
  hasError: false,
  setHasError: () => {},
  pageNumber: '1',
  setPageNumber: () => {},
  limit: '20',
  setLimit: () => {},
  searchValue: '',
  setSearchValue: () => {},
});
