import { useState } from 'react';
import { useContext } from 'react';
import './search-input.scss';
import { Context } from '../../constants/context';
import { useDispatch } from 'react-redux';
import {
  setPageNumber,
  setSearchValue,
} from '../../redux/features/searchSlice';
import { Page_Number_Default } from '../../constants/searchParam';

const SearchInfo = () => {
  const { isLoading } = useContext(Context);
  const dispatch = useDispatch();
  const [input, setInput] = useState(localStorage.getItem('searchValue') || '');

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value);
  }

  const handleClick = () => {
    dispatch(setPageNumber(Page_Number_Default));
    dispatch(setSearchValue(input));
    localStorage.setItem('searchValue', input);
  };

  return (
    <div className="search-data">
      <input
        type="text"
        className="search-data__input"
        value={input}
        onChange={handleChange}
        role="input"
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
