import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Context } from '../../constants/context';
import Results from './result-component';
import { mockDataTest } from '../../mock/mock';
import { BeerSort } from '../../types/response-interface';
import CardPage from '../../pages/CardPage/CardPage';

const renderComponent = (mockDataTest: BeerSort[]) => {
  render(
    <MemoryRouter>
      <Context.Provider
        value={{
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
          data: mockDataTest,
        }}
      >
        <Results />
      </Context.Provider>
    </MemoryRouter>
  );
};

describe('<Results />', () => {
  it('renders the specified number of cards', () => {
    renderComponent(mockDataTest);

    const cards = screen.getAllByRole('card');

    expect(cards).toHaveLength(2);
  });

  it('shows an appropriate message if no cards are present', () => {
    renderComponent([]);

    const message = screen.getByRole('empty');

    expect(message).toHaveTextContent(
      /No results were found for your request/i
    );
  });

  it('displays relevant card details', () => {
    renderComponent(mockDataTest);

    const cards = screen.getAllByRole('card');

    cards.forEach((card, index) => {
      const mockData = mockDataTest[index];

      expect(card).toHaveTextContent(mockData.name);
      expect(card).toHaveTextContent(mockData.tagline);
      expect(card).toHaveTextContent(mockData.first_brewed);
    });
  });

  it('opens a detailed card when you click on the card', () => {
    renderComponent(mockDataTest);
    const card = screen.getAllByRole('card');
    fireEvent.click(card[0]);
    expect(<CardPage />).toBeDefined();
  });
});
