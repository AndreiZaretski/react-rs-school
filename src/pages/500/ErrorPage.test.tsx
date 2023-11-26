import { render, screen } from '@testing-library/react';
import ErrorPage from '.';
import { Provider } from 'react-redux';
import { store } from '../../redux/store/store';
import React from 'react';

describe('<ErrorPage />', () => {
  it('renders ErrorPage component when error occurs', () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };
    render(
      <Provider store={store}>
        <ErrorPage>
          <ThrowError />
        </ErrorPage>
      </Provider>
    );
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/test error/i)).toBeInTheDocument();
  });
});
