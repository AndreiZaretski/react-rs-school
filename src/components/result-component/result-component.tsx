import styles from './result-component.module.scss';
import Link from 'next/link';
import { BeerSort } from '@/types/response-interface';
import { useDispatch } from 'react-redux';
import { BeerQuery } from '@/constants/request-url';
import { useGetBeersArrayQuery } from '@/redux/api/beerApi';
import { setLengthValue } from '@/redux/features/dataLengthSlice';
import { useRouter } from 'next/router';
import Image from 'next/image';

type resultProps = {
  beers: BeerSort[];
};

const Results = ({ beers }: resultProps) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const searchParams = router.query;

  const searchValue = searchParams[BeerQuery.Name] as string;
  const pageNumber = searchParams[BeerQuery.Page] as string;
  const limit = searchParams[BeerQuery.Limit] as string;

  const { data } = useGetBeersArrayQuery(
    {
      searchValue,
      pageNumber,
      limit,
    },
    {
      skip: router.isFallback,
    }
  );

  if (data) {
    dispatch(setLengthValue(data.length));
  }

  return (
    <div className={styles.content}>
      {!beers || beers.length === 0 ? (
        <div role="empty" className={styles.content__empty}>
          No results were found for your request
        </div>
      ) : (
        <div className={styles.content__cards}>
          {beers.map((beer) => {
            return (
              <Link href={`/beer/${beer.id}`} key={beer.id} replace>
                <div role="card" className={styles.content__item}>
                  <h3>{beer.name}</h3>
                  <div className={styles.content__img}>
                    {beer.image_url && (
                      <Image
                        src={beer.image_url}
                        alt={beer.name}
                        width={80}
                        height={160}
                      />
                    )}
                  </div>
                  <p>
                    Tag: <b>{beer.tagline}</b>
                  </p>
                  <p>
                    Date relase: <b>{beer.first_brewed}</b>
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
      <div className={styles.content__info}>
        {beers ? beers.length : 0} of {325} shown
      </div>
    </div>
  );
};

export default Results;
