import { useContext } from 'react';
import styles from './PaginationComponent.module.scss';
import { Context } from '../../constants/context';
import { useDispatch, useSelector } from 'react-redux';
import { setPageNumber, setLimit } from '../../redux/features/searchSlice';
import { AppState } from '../../redux/store/store';
import { Page_Number_Default } from '../../constants/searchParam';

const PaginationComponent = () => {
  const dispatch = useDispatch();
  const { data } = useContext(Context);

  const pageNumber = useSelector(
    (state: AppState) => state.searchParams.pageNumber
  );

  const limit = useSelector((state: AppState) => state.searchParams.limit);

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
        disabled={data.length === 0 || data.length < +limit}
        onClick={getNextPage}
        role="next"
      >
        next
      </button>
    </div>
  );
};

export default PaginationComponent;
