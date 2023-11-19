import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { mockDataTest } from './mock';
import { API_URL } from '../constants/request-url';

const handlers = [
  http.get(`${API_URL.baseUrl}${API_URL.beerEndpoint}`, () => {
    return HttpResponse.json(mockDataTest);
  }),

  http.get(`${API_URL.baseUrl}${API_URL.beerEndpoint}1`, () => {
    return HttpResponse.json(mockDataTest.slice(0, 1));
  }),
];

export const mockBeerServer = setupServer(...handlers);
