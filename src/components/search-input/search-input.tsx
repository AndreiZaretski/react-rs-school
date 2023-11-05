import { useState } from 'react';
import './search-input.scss';
import { SearchProps } from '../../types/search-props';

function SearchInfo(props: SearchProps) {
  const [input, setInput] = useState(localStorage.getItem('searchValue') || '');

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value);
  }

  const handleClick = async () => {
    props.changePage(1);
    props.changeSearchValue(input);
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
        disabled={props.isLoading}
        onClick={handleClick}
      >
        Search
      </button>
    </div>
  );
}

export default SearchInfo;
