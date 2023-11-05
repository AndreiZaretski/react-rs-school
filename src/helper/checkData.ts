import { BeerSort } from '../types/response-interface';

export const isValidResult = (data: unknown): data is BeerSort[] => {
  return Array.isArray(data);
};
