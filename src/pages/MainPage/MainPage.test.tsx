import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MainPage from './MainPage';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { mockDataTest } from '../../mock/mock';
import { Provider } from 'react-redux';
import { store } from '../../redux/store/store';

const mockAxios = new MockAdapter(axios);

describe('<Main />', () => {
  it('renders Main component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByRole('mainPage')).toBeInTheDocument();
  });

  it('Should send request after render component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );
    const spy = vi.spyOn(mockAxios, 'onGet');
    mockAxios
      .onGet('https://api.punkapi.com/v2/beers/1')
      .reply(200, mockDataTest);
    expect(spy).toHaveBeenCalled();
    mockAxios.resetHistory();
  });
});
