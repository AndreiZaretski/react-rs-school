import { useState, useEffect, useCallback } from 'react';
import LoadingComponent from '../../components/loadingComponent/LoadingComponent';
import Results from '../../components/result-component/result-component';
import SearchInfo from '../../components/search-input/search-input';
import { BeerSort } from '../../types/response-interface';
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

const MainPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<BeerSort[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [pageNumber, setPageNumber] = useState(searchParams.get('page') || 1);
  const [limit, setLimit] = useState(searchParams.get('limit') || 20);
  const [searchValue, setSearchValue] = useState(
    localStorage.getItem('searchValue') || ''
  );
  const { id } = useParams();
  const navigate = useNavigate();

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

  const goHome = () => {
    if (id) {
      navigate('/');
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
    [pageNumber, limit]
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
      <div className="main-page">
        <div className={id ? 'result-with-details' : 'result'} onClick={goHome}>
          <SearchInfo
            isLoading={isLoading}
            changePage={handlePageNumber}
            changeSearchValue={handleSearchValue}
          />
          <PaginationComponent
            pageNumber={+pageNumber}
            changePage={handlePageNumber}
            changeLimit={handleLimit}
            limit={+limit}
            data={data}
          />
          <div>
            {isLoading ? <LoadingComponent /> : <Results data={data} />}
          </div>
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
    </>
  );
};

export default MainPage;
