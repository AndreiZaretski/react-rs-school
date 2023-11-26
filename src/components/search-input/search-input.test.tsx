import { render, screen, fireEvent } from '@testing-library/react';
import SearchInfo from './search-input';
import mockRouter from 'next-router-mock';

vi.mock('next/router', () => require('next-router-mock'));
const renderInput = () => {
  render(<SearchInfo />);
};

describe('<SearchInfo />', () => {
  it('Verify that clicking the Search button should be change qyery params', () => {
    renderInput();

    const input = screen.getByRole('input');
    const button = screen.getByRole('button');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(button);
    expect(mockRouter.asPath).toBe('/?beer_name=test&page=1');
  });
});
