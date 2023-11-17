import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Results from './result-component';
import { mockDataTest } from '../../mock/mock';
import axios from 'axios';
import '@testing-library/jest-dom';
import CardPage from '../../pages/CardPage/CardPage';
import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'react-redux';
import { store } from '../../redux/store/store';

const mockAxios = new MockAdapter(axios);

const renderComponent = () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/beer']}>
        <Results />
      </MemoryRouter>
    </Provider>
  );
};

describe('<Results />', () => {
  it('Verify that the component renders the specified number of cards', () => {
    renderComponent();

    const cards = screen.getAllByRole('card');

    expect(cards).toHaveLength(2);
  });

  it('Check that an appropriate message is displayed if no cards are present', () => {
    renderComponent();

    const message = screen.getByRole('empty');

    expect(message).toHaveTextContent(
      /No results were found for your request/i
    );
  });

  it('Ensure that the card component renders the relevant card data', () => {
    renderComponent();

    const cards = screen.getAllByRole('card');

    cards.forEach((card, index) => {
      const mockData = mockDataTest[index];

      expect(card).toHaveTextContent(mockData.name);
      expect(card).toHaveTextContent(mockData.tagline);
      expect(card).toHaveTextContent(mockData.first_brewed);
    });
  });

  it('Validate that clicking on a card opens a detailed card component', () => {
    renderComponent();
    const card = screen.getAllByRole('card');
    fireEvent.click(card[0]);
    waitFor(() => {
      const cartDetails = screen.getByRole('cartPage');
      expect(cartDetails).toBeInTheDocument();
    });
  });

  it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
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

    const spy = vi.spyOn(mockAxios, 'onGet');
    mockAxios
      .onGet('https://api.punkapi.com/v2/beers/1')
      .reply(200, mockDataTest[0]);
    expect(spy).toHaveBeenCalledTimes(1);
    mockAxios.resetHistory();
  });
});
