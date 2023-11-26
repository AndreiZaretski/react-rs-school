import styles from './PaginationComponent.module.scss';
import { Page_Number_Default } from '../../constants/searchParam';
import { useRouter } from 'next/router';
import { BeerQuery } from '@/constants/request-url';

type props = {
  dataLength: number;
};

const PaginationComponent = ({ dataLength }: props) => {
  const router = useRouter();

  const pageNumber = Number(router.query[BeerQuery.Page]) || 1;
  const limit = router.query[BeerQuery.Limit] || '20';

  const getNextPage = () => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, [BeerQuery.Page]: `${pageNumber + 1}` },
    });
  };

  const getPrevPage = () => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, [BeerQuery.Page]: `${pageNumber - 1}` },
    });
  };

  const newLimit = (limit: string) => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        [BeerQuery.Limit]: limit,
        [BeerQuery.Page]: Page_Number_Default,
      },
    });
  };

  return (
    <div className={styles.pagination_block}>
      <label htmlFor="limit">Elements per page</label>
      <select
        id="limit"
        className={styles.pagination_block_button}
        value={router.query[BeerQuery.Limit] || '20'}
        onChange={(e) => newLimit(e.target.value)}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
      <button
        className={styles.pagination_block_button}
        disabled={pageNumber === +Page_Number_Default}
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
