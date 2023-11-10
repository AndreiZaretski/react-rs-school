import { useState } from 'react';
import { useContext } from 'react';
import './search-input.scss';
import { Context } from '../../constants/context';

const SearchInfo = () => {
  const { isLoading, setPageNumber, setSearchValue } = useContext(Context);
  const [input, setInput] = useState(localStorage.getItem('searchValue') || '');

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value);
  }

  const handleClick = () => {
    setPageNumber('1');
    setSearchValue(input);
    localStorage.setItem('searchValue', input);
  };

  return (
    <div className="search-data">
      <input
        type="text"
        className="search-data__input"
        value={input}
        onChange={handleChange}
      />
      <button
        type="button"
        className="search-data__button"
        disabled={isLoading}
        onClick={handleClick}
      >
        Search
      </button>
    </div>
  );
};

export default SearchInfo;
