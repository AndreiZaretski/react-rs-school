import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Results from './result-component';
import { mockDataTest } from '../../mock/mock';
import '@testing-library/jest-dom';
import CardPage from '../CardPage/CardPage';
import { mockBeerServer } from '../../mock/mockBeerServer';
import { store } from '@/redux/store/store';
import { Provider } from 'react-redux';
import Beer from '@/pages/beer';

vi.mock('next/router', () => require('next-router-mock'));
const storeObject = store();

const renderComponent = () => {
  render(
    <Provider store={storeObject}>
      <Beer beers={mockDataTest} dataLength={mockDataTest.length} />
    </Provider>
  );
};

describe('<Results />', () => {
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
    render(<CardPage beersById={mockDataTest} />);
    await waitFor(() => {
      const cartDetails = screen.getByRole('cartPage');
      expect(cartDetails).toBeInTheDocument();
    });
  });
});

describe('<Results /> empty', () => {
  beforeAll(() => mockBeerServer.listen({ onUnhandledRequest: 'error' }));
  afterEach(() => mockBeerServer.resetHandlers());
  afterAll(() => mockBeerServer.close());

  it('Check that an appropriate message is displayed if no cards are present', async () => {
    render(<Results beers={[]} />);

    await waitFor(() => {
      const message = screen.getByRole('empty');
      expect(message).toHaveTextContent(
        /No results were found for your request/i
      );
    });
  });
});
