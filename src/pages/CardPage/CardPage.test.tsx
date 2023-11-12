import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Context } from '../../constants/context';
import { mockDataTest } from '../../mock/mock';
import CardPage from '../../pages/CardPage/CardPage';
import { mockContext } from '../../mock/mockContext';

const renderComponent = async (loading: boolean) => {
  render(
    <MemoryRouter initialEntries={['/beer/1']}>
      <Context.Provider value={mockContext(mockDataTest, loading)}>
        <CardPage data={mockDataTest[0]} />
      </Context.Provider>
    </MemoryRouter>
  );
};

describe('<CardPage />', () => {
  it('Check that a loading indicator is displayed while fetching data', async () => {
    renderComponent(true);
    const loading = await screen.findByRole('loading');
    expect(loading).toBeInTheDocument();
    expect(loading).toHaveTextContent('...Loading');
  });

  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    renderComponent(false);
    const detail = await screen.findByRole('detail');
    waitFor(() => {
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
    renderComponent(false);

    const button = screen.getByRole('buttonLink');
    fireEvent.click(button);

    const detail = await screen.findByRole('cartPage');
    waitFor(() => {
      expect(detail).not.toBeInTheDocument();
    });
  });
});
