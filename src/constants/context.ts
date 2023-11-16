import { createContext } from 'react';
import { BeerSort } from '../types/response-interface';

export interface BeerContextType {
  data: BeerSort[];
  setData: (data: BeerSort[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  hasError: boolean;
  setHasError: (hasError: boolean) => void;
}

export const Context = createContext<BeerContextType>({
  data: [],
  setData: () => {},
  isLoading: false,
  setIsLoading: () => {},
  hasError: false,
  setHasError: () => {},
});
