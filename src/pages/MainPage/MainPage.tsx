import { useEffect, useCallback, useState } from 'react';
import LoadingComponent from '../../components/loadingComponent/LoadingComponent';
import Results from '../../components/result-component/result-component';
import SearchInfo from '../../components/search-input/search-input';
import {
  Outlet,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import './MainPage.scss';
import axios from 'axios';
import { API_URL, Query } from '../../constants/request-url';
import PaginationComponent from '../../components/PaginationComponent/PaginationComponent';
import { isValidResult } from '../../helper/checkData';
import { Context } from '../../constants/context';
import { BeerSort } from '../../types/response-interface';

const MainPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<BeerSort[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [pageNumber, setPageNumber] = useState(searchParams.get('page') || '1');
  const [limit, setLimit] = useState(searchParams.get('limit') || '20');
  const [searchValue, setSearchValue] = useState(
    localStorage.getItem('searchValue') || ''
  );

  const { id } = useParams();
  const navigate = useNavigate();

  const createError = () => {
    setHasError(true);
  };

  const goHome = () => {
    if (id) {
      navigate('/beer');
    }
    return;
  };

  const getError = useCallback(() => {
    if (hasError) {
      throw new Error("It's error from click button");
    }
  }, [hasError]);

  useEffect(() => {
    getError();
  }, [getError]);

  const getBeersArray = useCallback(
    async (input: string) => {
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
    },
    [setIsLoading, pageNumber, limit, setData]
  );

  useEffect(() => {
    getBeersArray(searchValue);
  }, [getBeersArray, searchValue]);

  const updateSearchParams = useCallback(() => {
    searchParams.set('page', String(pageNumber));
    searchParams.set('limit', String(limit));
    searchValue === ''
      ? searchParams.delete('name')
      : searchParams.set('name', searchValue);
    setSearchParams(searchParams);
  }, [pageNumber, searchParams, limit, searchValue, setSearchParams]);

  useEffect(() => {
    updateSearchParams();
  }, [updateSearchParams]);

  return (
    <>
      <Context.Provider
        value={{
          data,
          setData,
          isLoading,
          setIsLoading,
          hasError,
          setHasError,
          pageNumber,
          setPageNumber,
          limit,
          setLimit,
          searchValue,
          setSearchValue,
        }}
      >
        <div className="main-page">
          <div
            className={id ? 'result-with-details' : 'result'}
            onClick={goHome}
          >
            <SearchInfo />
            <PaginationComponent />
            <div>{isLoading ? <LoadingComponent /> : <Results />}</div>
            <div className="error-block">
              <button className="error-block__button" onClick={createError}>
                Error
              </button>
            </div>
          </div>
          <div className={id ? 'result-details' : 'result-details-none'}>
            <Outlet />
          </div>
        </div>
      </Context.Provider>
    </>
  );
};

export default MainPage;
