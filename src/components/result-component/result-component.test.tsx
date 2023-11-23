import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Results from './result-component';
import { mockDataTest } from '../../mock/mock';
import '@testing-library/jest-dom';
import CardPage from '../../pages/CardPage/CardPage';
import { Provider } from 'react-redux';
import { store } from '../../redux/store/store';
import { mockBeerServer } from '../../mock/mockBeerServer';
import { HttpResponse, http } from 'msw';
import { API_URL } from '../../constants/request-url';
import { setSearchValue } from '../../redux/features/searchSlice';
import * as beerApi from '../../redux/api/beerApi';
import userEvent from '@testing-library/user-event';
import React from 'react';

const renderComponent = () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[`/beer`]}>
        <Results />
      </MemoryRouter>
    </Provider>
  );
};

describe('<Results />', () => {
  const click = userEvent.setup();
  beforeAll(() => mockBeerServer.listen({ onUnhandledRequest: 'error' }));
  afterEach(() => mockBeerServer.resetHandlers());
  afterAll(() => mockBeerServer.close());

  it('Verify that the component renders the specified number of cards', async () => {
    renderComponent();

    const cards = await screen.findAllByRole('card');

    expect(cards).toHaveLength(2);
  });

  it('Ensure that the card component renders the relevant card data', async () => {
    renderComponent();

    const cards = await screen.findAllByRole('card');

    cards.forEach((card, index) => {
      const mockData = mockDataTest[index];

      expect(card).toHaveTextContent(mockData.name);
      expect(card).toHaveTextContent(mockData.tagline);
      expect(card).toHaveTextContent(mockData.first_brewed);
    });
  });

  it('Validate that clicking on a card opens a detailed card component', async () => {
    renderComponent();
    const card = screen.getAllByRole('card');
    fireEvent.click(card[0]);
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/beer/1']}>
          <CardPage />
        </MemoryRouter>
      </Provider>
    );
    await waitFor(() => {
      const cartDetails = screen.getByRole('cartPage');
      expect(cartDetails).toBeInTheDocument();
    });
  });

  it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    const mockUseGetBeerByIdQuery = vi.spyOn(beerApi, 'useGetBeerByIdQuery');
    renderComponent();
    const card = screen.getAllByRole('card');
    await click.click(card[0]);
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/beer/1']}>
          <CardPage />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(mockUseGetBeerByIdQuery).toHaveBeenCalledTimes(1);
      mockUseGetBeerByIdQuery.mockReset();
    });
  });
});

describe('<Results /> empty', () => {
  beforeAll(() => mockBeerServer.listen({ onUnhandledRequest: 'error' }));
  afterEach(() => mockBeerServer.resetHandlers());
  afterAll(() => mockBeerServer.close());

  it('Check that an appropriate message is displayed if no cards are present', async () => {
    store.dispatch(setSearchValue('invalidsearch'));
    renderComponent();

    mockBeerServer.use(
      http.get(
        `${API_URL.baseUrl}${API_URL.beerEndpoint}`,
        () => {
          return HttpResponse.json([]);
        },
        { once: true }
      )
    );

    await waitFor(() => {
      const message = screen.getByRole('empty');
      expect(message).toHaveTextContent(
        /No results were found for your request/i
      );
    });
  });

  it('Should send request after render component', async () => {
    const mockUseGetBeersArrayQuery = vi.spyOn(
      beerApi,
      'useGetBeersArrayQuery'
    );
    renderComponent();
    await waitFor(() => {
      expect(mockUseGetBeersArrayQuery).toHaveBeenCalledTimes(1);
      vi.resetAllMocks();
      mockUseGetBeersArrayQuery.mockReset();
    });
  });
});
