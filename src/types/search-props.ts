import { BeerSort } from './response-interface';

export interface SearchPropsData {
  data: BeerSort[];
}

export interface SearchProps {
  isLoading: boolean;
  changePage: (pageNumber: number) => void;
  changeSearchValue: (value: string) => void;
}

export interface Pagination {
  changeLimit: (limit: number) => void;
  changePage: (pageNumber: number) => void;
  pageNumber: number;
  limit: number;
  data: BeerSort[];
}
