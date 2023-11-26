import { render, screen } from '@testing-library/react';
import Layout from './layout';
import { Provider } from 'react-redux';
import { store } from '@/redux/store/store';

vi.mock('next/router', () => require('next-router-mock'));

const storeObject = store();

describe('<Main />', () => {
  it('renders Main component', () => {
    render(
      <Provider store={storeObject}>
        <Layout beers={[]} beerById={null} />
      </Provider>
    );
    expect(screen.getByRole('mainPage')).toBeInTheDocument();
  });
});
