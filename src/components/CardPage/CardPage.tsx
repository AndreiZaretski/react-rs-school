import styles from './CardPage.module.scss';
import Link from 'next/link';
import { BeerSort } from '@/types/response-interface';
import Image from 'next/image';

type resultProps = {
  beersById: BeerSort[] | null;
};

const CardPage = ({ beersById }: resultProps) => {
  return (
    <div className={styles.card_page} role="cartPage">
      <div className={styles.card_page__content}>
        <Link href={`/beer`} role="buttonLink">
          <button className={styles.card_page__button}>Back</button>
        </Link>
        {beersById ? (
          <>
            <div className={styles.card_page__detail} role="detail">
              <h2>{beersById[0].name}</h2>
              <div className={styles.card_page__img}>
                {beersById[0].image_url && (
                  <Image
                    src={beersById[0].image_url}
                    alt={beersById[0].name}
                    height={300}
                    width={200}
                    role="img"
                  />
                )}
              </div>
              <p>
                Tag: <b>{beersById[0].tagline}</b>
              </p>
              <p>
                Description: <b>{beersById[0].description}</b>
              </p>
              <p>
                Date relase: <b>{beersById[0].first_brewed}</b>
              </p>
              <p>
                Contributed: <b>{beersById[0].contributed_by}</b>
              </p>
            </div>
          </>
        ) : (
          <div className={styles.card_page__empty}>
            No results were found for your request
          </div>
        )}
      </div>
    </div>
  );
};

export default CardPage;
