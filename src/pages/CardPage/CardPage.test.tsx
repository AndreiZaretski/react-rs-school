import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { mockDataTest } from '../../mock/mock';
import CardPage from '../../pages/CardPage/CardPage';
import { Provider } from 'react-redux';
import { store } from '../../redux/store/store';
import { mockBeerServer } from '../../mock/mockBeerServer';

vi.mock('react-router-dom', () => {
  const router = require('react-router-dom');
  return {
    ...router,
    useParams: () => ({ id: '1' }),
  };
});

const renderComponent = () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/1']} initialIndex={0}>
        <CardPage />
      </MemoryRouter>
    </Provider>
  );
};

describe('<CardPage />', () => {
  beforeAll(() => mockBeerServer.listen());
  afterEach(() => mockBeerServer.resetHandlers());
  afterAll(() => mockBeerServer.close());

  it('Check that a loading indicator is displayed while fetching data', async () => {
    renderComponent();
    const loading = await screen.findByRole('loading');
    expect(loading).toBeInTheDocument();
    expect(loading).toHaveTextContent('...Loading');
  });

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
      expect(image).toHaveAttribute('src', mockDataTest[0].image_url);
      expect(image).toHaveAttribute('alt', 'Buzz');
    });
  });

  it('Ensure that clicking the close button hides the component', async () => {
    renderComponent();

    const button = screen.getByRole('buttonLink');
    fireEvent.click(button);

    const detail = await screen.findByRole('cartPage');
    waitFor(() => {
      expect(detail).not.toBeInTheDocument();
    });
  });
});
