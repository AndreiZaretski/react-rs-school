import { useEffect, useState } from 'react';
import axios from 'axios';
import { ResponseResult } from '../../types/response-interface';
import { API_URL } from '../../constants/request-url';
import './search-input.scss';
import { SearchProps } from '../../types/search-props';

function SearchInfo(props: SearchProps) {
  const [input, setInput] = useState(localStorage.getItem('searchValue') || '');

  useEffect(() => {
    const searchValue = input;
    setInput(searchValue);
    sendRequest(searchValue);
  }, []);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value);
  }

  const handleClick = async () => {
    localStorage.setItem('searchValue', input);
    await sendRequest(input);
  };

  const isResults = (data: unknown): data is ResponseResult[] => {
    if (!Array.isArray(data)) {
      return false;
    }
    return true;
  };

  const sendRequest = async (input: string) => {
    try {
      props.onLoading(true);
      const response = await axios({
        url: `${API_URL.baseUrl}${API_URL.character}`,
        params: {
          [`${API_URL.name}`]: input,
          [`${API_URL.page}`]: 0,
          [`${API_URL.limit}`]: 20,
        },
      });

      if (
        response.data.results &&
        response.data.info &&
        isResults(response.data.results)
      ) {
        props.onLoading(false);
        props.onResponse(response.data.results, response.data.info);
      }
    } catch (error) {
      props.onLoading(false);
      props.onResponse([], null);
    }
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
