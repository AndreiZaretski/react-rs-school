import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BeerSort } from '../../types/response-interface';
import { API_URL, BeerQuery } from '../../constants/request-url';

interface SearchBeerQuery {
  searchValue: string;
  pageNumber: number;
  limit: string;
}

export const beerApi = createApi({
  reducerPath: 'beerApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL.baseUrl }),
  endpoints: (builder) => ({
    getBeersArray: builder.query<BeerSort[], SearchBeerQuery>({
      query: ({ searchValue, pageNumber, limit }) => ({
        url: API_URL.beerEndpoint,
        params: {
          ...(searchValue && { [BeerQuery.Name]: searchValue }),
          [BeerQuery.Page]: pageNumber,
          [BeerQuery.Limit]: limit,
        },
      }),

      transformResponse: (res: BeerSort[]) =>
        res.map((beer) => ({ ...beer, id: beer.id })),
    }),
    getBeerById: builder.query<BeerSort[], string>({
      query: (id: string) => API_URL.beerEndpoint + id,
    }),
  }),
});

export const { useGetBeersArrayQuery, useGetBeerByIdQuery } = beerApi;
