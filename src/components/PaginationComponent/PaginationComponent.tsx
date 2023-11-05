import { Pagination } from '../../types/search-props';
import styles from './PaginationComponent.module.scss';

const PaginationComponent = (props: Pagination) => {
  const nextPage = () => {
    props.changePage(props.pageNumber + 1);
  };

  const prevPage = () => {
    props.changePage(props.pageNumber - 1);
  };

  const newLimit = (limit: number) => {
    props.changeLimit(limit);
    props.changePage(1);
  };
  return (
    <div className={styles.pagination_block}>
      <label htmlFor="limit">Number of elements per page</label>
      <select
        id="limit"
        value={props.limit}
        onChange={(e) => newLimit(Number(e.target.value))}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="80">80</option>
      </select>
      <button disabled={props.pageNumber === 1} onClick={prevPage}>
        prev
      </button>
      <span>{props.pageNumber}</span>
      <button
        disabled={props.data.length === 0 || props.data.length < props.limit}
        onClick={nextPage}
      >
        next
      </button>
    </div>
  );
};

export default PaginationComponent;
