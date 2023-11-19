import styles from './PaginationComponent.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setPageNumber, setLimit } from '../../redux/features/searchSlice';
import { AppState } from '../../redux/store/store';
import { Page_Number_Default } from '../../constants/searchParam';
import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const PaginationComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const { dataLength } = useSelector((state: AppState) => state.dataLength);

  const { pageNumber, limit } = useSelector(
    (state: AppState) => state.searchParams
  );

  const getNextPage = () => {
    dispatch(setPageNumber(pageNumber + 1));
  };

  const getPrevPage = () => {
    dispatch(setPageNumber(pageNumber - 1));
  };

  const newLimit = (limit: string) => {
    dispatch(setPageNumber(Page_Number_Default));
    dispatch(setLimit(limit));
  };

  const updateSearchParams = useCallback(() => {
    searchParams.set('page', String(pageNumber));
    searchParams.set('limit', String(limit));

    setSearchParams(searchParams);
  }, [pageNumber, searchParams, limit, setSearchParams]);

  useEffect(() => {
    updateSearchParams();
  }, [updateSearchParams]);
  return (
    <div className={styles.pagination_block}>
      <label htmlFor="limit">Elements per page</label>
      <select
        id="limit"
        className={styles.pagination_block_button}
        value={limit}
        onChange={(e) => newLimit(e.target.value)}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
      <button
        className={styles.pagination_block_button}
        disabled={pageNumber === Page_Number_Default}
        onClick={getPrevPage}
        role="prev"
      >
        prev
      </button>
      <span>{pageNumber}</span>
      <button
        className={styles.pagination_block_button}
        disabled={dataLength === 0 || dataLength < +limit}
        onClick={getNextPage}
        role="next"
      >
        next
      </button>
    </div>
  );
};

export default PaginationComponent;
