import { useState, useEffect } from 'react';
import LoadingComponent from '../../components/loadingComponent/LoadingComponent';
import Results from '../../components/result-component/result-component';
import SearchInfo from '../../components/search-input/search-input';
import { BeerSort } from '../../types/response-interface';
import { Outlet, useSearchParams } from 'react-router-dom';
import './MainPage.scss';
import axios from 'axios';
import { API_URL, Query } from '../../constants/request-url';
import PaginationComponent from '../../components/PaginationComponent/PaginationComponent';

const MainPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<BeerSort[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [pageNumber, setPageNumber] = useState(searchParams.get('page') || 1);
  const [limit, setLimit] = useState(20);
  const [searchValue, setSearchValue] = useState(
    localStorage.getItem('searchValue') || ''
  );

  const handlePageNumber = (pageNumber: number) => {
    setPageNumber(pageNumber);
  };

  const handleSearchValue = (value: string) => {
    setSearchValue(value);
  };

  const handleLimit = (limit: number) => {
    setLimit(limit);
  };

  const createError = () => {
    setHasError(true);
  };

  useEffect(() => {
    if (hasError) {
      throw new Error("It's error from click button");
    }
  }, [hasError]);

  const isValidResult = (data: unknown): data is BeerSort[] => {
    return Array.isArray(data);
  };

  useEffect(() => {
    const sendRequest = async (input: string) => {
      try {
        setIsLoading(true);

        const response = await axios({
          url: `${API_URL.baseUrl}${API_URL.endpoint}`,
          params: {
            ...(input && { [Query.Name]: input }),
            [Query.Page]: pageNumber,
            [Query.Limit]: limit,
          },
        });

        if (response.data && isValidResult(response.data)) {
          setIsLoading(false);
          setData(response.data);
        }
      } catch (error) {
        setIsLoading(false);
        setData([]);
      }
    };
    sendRequest(searchValue);
  }, [pageNumber, limit, searchValue]);

  useEffect(() => {
    searchParams.set('page', String(pageNumber));
    setSearchParams(searchParams);
  }, [pageNumber, searchParams, setSearchParams]);

  return (
    <>
      <SearchInfo
        isLoading={isLoading}
        changePage={handlePageNumber}
        changeSearchValue={handleSearchValue}
      />
      <div className="main-page">
        <div>
          <PaginationComponent
            pageNumber={+pageNumber}
            changePage={handlePageNumber}
            changeLimit={handleLimit}
            limit={limit}
            data={data}
          />
          <div className="result">
            {isLoading ? <LoadingComponent /> : <Results data={data} />}
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
