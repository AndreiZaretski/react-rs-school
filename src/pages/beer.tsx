import Layout from '@/components/layout/layout';
import { BeerQuery } from '@/constants/request-url';
import {
  getBeersArray,
  getBeerById,
  getRunningQueriesThunk,
} from '@/redux/api/beerApi';
import { wrapper } from '@/redux/store/store';
import { BeerSort } from '@/types/response-interface';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

function Main({
  beers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <Layout beers={beers} beerById={null} />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const searchParams = context.query;

    const id = context.params?.id as string;

    const searchValue = searchParams[BeerQuery.Name] as string;
    const pageNumber = searchParams[BeerQuery.Page] as string;
    const limit = searchParams[BeerQuery.Limit] as string;
    if (
      typeof searchValue === 'string' &&
      typeof pageNumber === 'string' &&
      typeof limit === 'string'
    ) {
      store.dispatch(
        getBeersArray.initiate({ searchValue, pageNumber, limit })
      );
    }

    if (typeof id === 'string') {
      store.dispatch(getBeerById.initiate(id));
    }

    await Promise.all(store.dispatch(getRunningQueriesThunk()));
    console.log('State on server', searchParams);

    const state = store.getState();

    const beers = getBeersArray.select({ searchValue, pageNumber, limit })(
      state
    );
    const beerById = getBeerById.select(id)(state);

    return {
      props: {
        beers: beers.data && !beers.isLoading && !beers.error ? beers.data : [],
        beerById:
          beerById.data && !beerById.isLoading && !beerById.error
            ? beerById.data
            : [],
      },
    };
  }
) satisfies GetServerSideProps<{
  beers: BeerSort[];
  beerById: BeerSort[];
}>;

export default Main;
