import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MainPage from './MainPage';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mockDataTest } from '../../mock/mock';

const mockAxios = new MockAdapter(axios);

describe('<Main />', () => {
  it('renders Main component', () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );
    expect(screen.getByRole('mainPage')).toBeInTheDocument();
  });

  it('Should send request after render component', () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );
    const spy = vi.spyOn(mockAxios, 'onGet');
    mockAxios
      .onGet('https://api.punkapi.com/v2/beers/1')
      .reply(200, mockDataTest);
    expect(spy).toHaveBeenCalled();
    mockAxios.resetHistory();
  });
});
