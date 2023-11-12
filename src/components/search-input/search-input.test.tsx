import { render, screen, fireEvent } from '@testing-library/react';
import { Context } from '../../constants/context';
import SearchInfo from './search-input';
import { mockContext } from '../../mock/mockContext';

const renderInput = () => {
  render(
    <Context.Provider value={mockContext()}>
      <SearchInfo />
    </Context.Provider>
  );
};

describe('<SearchInfo />', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('retrieves the value from the local storage upon mounting', () => {
    localStorage.setItem('searchValue', 'test');
    renderInput();
    const input = screen.getByRole('input');
    expect(input).toHaveValue('test');
  });

  it('saves the entered value to the local storage upon clicking the Search button', () => {
    renderInput();

    const input = screen.getByRole('input');
    const button = screen.getByRole('button');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.click(button);
    expect(localStorage.getItem('searchValue')).toBe('test');
  });
});
