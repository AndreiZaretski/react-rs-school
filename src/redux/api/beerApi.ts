import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BeerSort } from '../../types/response-interface';
import { API_URL, BeerQuery } from '../../constants/request-url';
import { HYDRATE } from 'next-redux-wrapper';

interface SearchBeerQuery {
  searchValue: string;
  pageNumber: string;
  limit: string;
}

export const beerApi = createApi({
  reducerPath: 'beerApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL.baseUrl }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
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

export const {
  useGetBeersArrayQuery,
  useGetBeerByIdQuery,
  util: { getRunningQueriesThunk },
} = beerApi;

export const { getBeersArray, getBeerById } = beerApi.endpoints;
