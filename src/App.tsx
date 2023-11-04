import { useState, useEffect } from 'react';
import './App.scss';
import reactLogo from './assets/react.svg';
import SearchInfo from './components/search-input/search-input';
import Results from './components/result-component/result-component';
import { ResponseResult, InfoData } from './types/response-interface';

function App() {
  const [data, setData] = useState<ResponseResult[]>([]);
  const [info, setInfo] = useState<InfoData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleResponse = (results: ResponseResult[], info: InfoData | null) => {
    setData(results);
    setInfo(info);
  };

  const handleLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const createError = () => {
    setHasError(true);
  };

  useEffect(() => {
    if (hasError) {
      throw new Error("It's error from click button");
    }
  }, [hasError]);

  return (
    <>
      <div>
        <SearchInfo
          onResponse={handleResponse}
          data={data}
          info={info}
          isLoading={isLoading}
          onLoading={handleLoading}
        />
      </div>
      <div className="result">
        {isLoading ? (
          <div className="result__loading">
            <p>...Loading</p>
            <img src={reactLogo} className="logo" alt="React logo" />
          </div>
        ) : (
          <Results data={data} info={info} />
        )}
        <div className="error-block">
          <button className="error-block__button" onClick={createError}>
            Error
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
