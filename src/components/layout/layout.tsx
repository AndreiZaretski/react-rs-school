import React, { useEffect } from 'react';
import PaginationComponent from '../PaginationComponent/PaginationComponent';
import Results from '../result-component/result-component';
import SearchInfo from '../search-input/search-input';
import { setHasError } from '@/redux/features/errorSlice';
import { AppState } from '@/redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import styles from './layout.module.scss';
import { BeerSort } from '@/types/response-interface';

type Props = {
  children?: (beerById: BeerSort[] | null) => React.ReactNode | null;
  beers: BeerSort[];
  beerById: BeerSort[] | null;
  dataLength?: number;
};

export default function Layout({
  children,
  beers,
  beerById,
  dataLength,
}: Props) {
  const dispatch = useDispatch();
  const hasError = useSelector((state: AppState) => state.error.hasError);

  const router = useRouter();

  const id = router.query.id;

  const createError = () => {
    dispatch(setHasError());
  };

  const goHome = () => {
    if (id) {
      router.push('/beer');
    }
    return;
  };

  useEffect(() => {
    if (hasError) {
      throw new Error("It's error from click button");
    }
  }, [hasError]);

  return (
    <>
      <div className={styles.main_page} role="mainPage">
        <div
          className={id ? styles.result_with_details : styles.result}
          onClick={goHome}
        >
          <SearchInfo />
          <PaginationComponent dataLength={dataLength || 0} />
          <div>
            <Results beers={beers} />
          </div>
          <div className={styles.error_block}>
            <button
              className={styles.error_block__button}
              onClick={createError}
            >
              Error
            </button>
          </div>
        </div>
        <div
          className={id ? styles.result_details : styles.result_details_none}
        >
          {children && typeof children === 'function' && children(beerById)}
        </div>
      </div>
    </>
  );
}
