import { useContext } from 'react';
import styles from './PaginationComponent.module.scss';
import { Context } from '../../constants/context';

const PaginationComponent = () => {
  const { pageNumber, setPageNumber, setLimit, limit, data } =
    useContext(Context);

  const getNextPage = () => {
    setPageNumber(`${+pageNumber + 1}`);
  };

  const getPrevPage = () => {
    setPageNumber(`${+pageNumber - 1}`);
  };

  const newLimit = (limit: number) => {
    setLimit(`${limit}`);
    setPageNumber('1');
  };
  return (
    <div className={styles.pagination_block}>
      <label htmlFor="limit">Elements per page</label>
      <select
        id="limit"
        className={styles.pagination_block_button}
        value={limit}
        onChange={(e) => newLimit(Number(e.target.value))}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
      <button
        className={styles.pagination_block_button}
        disabled={pageNumber === '1'}
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
