import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MainPage from './MainPage';
import { Provider } from 'react-redux';
import { store } from '../../redux/store/store';

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
});
