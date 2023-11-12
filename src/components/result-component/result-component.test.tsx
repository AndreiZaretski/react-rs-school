import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Context } from '../../constants/context';
import Results from './result-component';
import { mockDataTest } from '../../mock/mock';
import { BeerSort } from '../../types/response-interface';
import axios from 'axios';
import '@testing-library/jest-dom';
import { mockContext } from '../../mock/mockContext';
import CardPage from '../../pages/CardPage/CardPage';
import MockAdapter from 'axios-mock-adapter';

const mockAxios = new MockAdapter(axios);

const renderComponent = (mockDataTest: BeerSort[]) => {
  render(
    <MemoryRouter initialEntries={['/beer']}>
      <Context.Provider value={mockContext(mockDataTest)}>
        <Results />
      </Context.Provider>
    </MemoryRouter>
  );
};

describe('<Results />', () => {
  it('Verify that the component renders the specified number of cards', () => {
    renderComponent(mockDataTest);

    const cards = screen.getAllByRole('card');

    expect(cards).toHaveLength(2);
  });

  it('Check that an appropriate message is displayed if no cards are present', () => {
    renderComponent([]);

    const message = screen.getByRole('empty');

    expect(message).toHaveTextContent(
      /No results were found for your request/i
    );
  });

  it('Ensure that the card component renders the relevant card data', () => {
    renderComponent(mockDataTest);

    const cards = screen.getAllByRole('card');

    cards.forEach((card, index) => {
      const mockData = mockDataTest[index];

      expect(card).toHaveTextContent(mockData.name);
      expect(card).toHaveTextContent(mockData.tagline);
      expect(card).toHaveTextContent(mockData.first_brewed);
    });
  });

  it('Validate that clicking on a card opens a detailed card component', () => {
    renderComponent(mockDataTest);
    const card = screen.getAllByRole('card');
    fireEvent.click(card[0]);
    waitFor(() => {
      const cartDetails = screen.getByRole('cartPage');
      expect(cartDetails).toBeInTheDocument();
    });
  });

  it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    renderComponent(mockDataTest);
    const card = screen.getAllByRole('card');
    fireEvent.click(card[0]);
    render(
      <MemoryRouter initialEntries={['/beer/1']}>
        <Context.Provider value={mockContext()}>
          <CardPage data={null} />
        </Context.Provider>
      </MemoryRouter>
    );

    const spy = vi.spyOn(mockAxios, 'onGet');
    mockAxios
      .onGet('https://api.punkapi.com/v2/beers/1')
      .reply(200, mockDataTest[0]);
    expect(spy).toHaveBeenCalledTimes(1);
    mockAxios.resetHistory();
  });
});
