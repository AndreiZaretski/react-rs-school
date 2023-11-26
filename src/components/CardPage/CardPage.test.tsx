import { render, screen, waitFor, act } from '@testing-library/react';
import { mockDataTest } from '../../mock/mock';
import CardPage from './CardPage';
import { mockBeerServer } from '../../mock/mockBeerServer';
import userEvent from '@testing-library/user-event';
import BeerDetail from '@/pages/beer/[id]';
import { store } from '@/redux/store/store';
import { Provider } from 'react-redux';

vi.mock('next/router', () => require('next-router-mock'));

const renderComponent = () => {
  render(<CardPage beersById={mockDataTest} />);
};

describe('<CardPage />', () => {
  beforeAll(() => mockBeerServer.listen());
  afterEach(() => mockBeerServer.resetHandlers());
  afterAll(() => mockBeerServer.close());

  const user = userEvent.setup();

  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    renderComponent();
    const detail = await screen.findByRole('detail');
    await waitFor(() => {
      expect(detail).toBeInTheDocument();
      expect(detail).toHaveTextContent(mockDataTest[0].name);
      expect(detail).toHaveTextContent(mockDataTest[0].tagline);
      expect(detail).toHaveTextContent(mockDataTest[0].first_brewed);
      expect(detail).toHaveTextContent(mockDataTest[0].description);
      expect(detail).toHaveTextContent(mockDataTest[0].contributed_by);
      const image = screen.getByRole('img');
      expect(image).toBeTruthy();
      expect(image).toHaveAttribute('alt', 'Buzz');
    });
  });

  it('Ensure that clicking the close button hides the component', async () => {
    const storeObject = store();
    render(
      <Provider store={storeObject}>
        <BeerDetail beers={mockDataTest} beerById={mockDataTest} />
      </Provider>
    );

    const button = screen.getByRole('buttonLink');
    const detail = await screen.findByRole('cartPage');
    expect(detail).toBeInTheDocument();
    await act(async () => await user.click(button));
    waitFor(() => {
      expect(detail).not.toBeInTheDocument();
    });
  });
});
