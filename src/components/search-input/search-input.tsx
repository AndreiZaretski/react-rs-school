import { useCallback, useEffect, useState } from 'react';
import './search-input.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  setPageNumber,
  setSearchValue,
} from '../../redux/features/searchSlice';
import { Page_Number_Default } from '../../constants/searchParam';
import { AppState } from '../../redux/store/store';
import { useSearchParams } from 'react-router-dom';

const SearchInfo = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isLoading = useSelector((state: AppState) => state.isLoading.isLoading);
  const dispatch = useDispatch();
  const [input, setInput] = useState(localStorage.getItem('searchValue') || '');
  const { searchValue } = useSelector((state: AppState) => state.searchParams);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value);
  }

  const handleClick = () => {
    dispatch(setPageNumber(Page_Number_Default));
    dispatch(setSearchValue(input));
    localStorage.setItem('searchValue', input);
  };

  const updateSearchParams = useCallback(() => {
    searchValue === ''
      ? searchParams.delete('name')
      : searchParams.set('name', searchValue);
    setSearchParams(searchParams);
  }, [searchParams, searchValue, setSearchParams]);

  useEffect(() => {
    updateSearchParams();
  }, [updateSearchParams]);

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
