import { useState } from 'react';
import styles from './search-input.module.scss';
import { useSelector } from 'react-redux';
import { Page_Number_Default } from '../../constants/searchParam';
import { AppState } from '../../redux/store/store';
import React from 'react';
import { useRouter } from 'next/router';
import { BeerQuery } from '@/constants/request-url';

const SearchInfo = () => {
  const router = useRouter();
  const isLoading = useSelector((state: AppState) => state.isLoading.isLoading);
  const [input, setInput] = useState('');

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value);
  }

  const handleClick = () => {
    if (!input) {
      delete router.query[BeerQuery.Page];
    }
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        [BeerQuery.Name]: input,
        [BeerQuery.Page]: Page_Number_Default,
      },
    });
  };

  return (
    <div className={styles.search_data}>
      <input
        type="text"
        className={styles.search_data__input}
        value={input}
        onChange={handleChange}
        role="input"
      />
      <button
        type="button"
        className={styles.search_data__button}
        disabled={isLoading}
        onClick={handleClick}
      >
        Search
      </button>
    </div>
  );
};

export default SearchInfo;
