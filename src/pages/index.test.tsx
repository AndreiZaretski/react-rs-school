import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { store } from '@/redux/store/store';
import { Provider } from 'react-redux';
import Home from '.';

vi.mock('next/router', () => require('next-router-mock'));
const storeObject = store();

const renderComponent = () => {
  render(
    <Provider store={storeObject}>
      <Home />
    </Provider>
  );
};

describe('<Home />', () => {
  it('Should be button', async () => {
    renderComponent();

    const button = screen.findAllByRole('home_button');

    expect(button).toBeTruthy();
  });
});
