import { useState, useEffect } from 'react';
import LoadingComponent from '../../components/loadingComponent/LoadingComponent';
import Results from '../../components/result-component/result-component';
import SearchInfo from '../../components/search-input/search-input';
import { ResponseResult, InfoData } from '../../types/response-interface';
import { Outlet } from 'react-router-dom';
import './MainPage.scss';

const MainPage = () => {
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
      <SearchInfo
        onResponse={handleResponse}
        data={data}
        info={info}
        isLoading={isLoading}
        onLoading={handleLoading}
      />
      <div className="main-page">
        <div>
          <div className="result">
            {isLoading ? (
              <LoadingComponent />
            ) : (
              <Results data={data} info={info} />
            )}
          </div>
        </div>
        <Outlet />
      </div>
      <div className="error-block">
        <button className="error-block__button" onClick={createError}>
          Error
        </button>
      </div>
    </>
  );
};

export default MainPage;
