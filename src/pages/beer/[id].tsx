import Layout from '@/components/layout/layout';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import CardPage from '@/components/CardPage/CardPage';
import { BeerQuery } from '@/constants/request-url';
import { Page_Number_Default, Limit } from '@/constants/searchParam';
import {
  getBeersArray,
  getBeerById,
  getRunningQueriesThunk,
} from '@/redux/api/beerApi';
import { wrapper } from '@/redux/store/store';
import { BeerSort } from '@/types/response-interface';

function BeerDetail({
  beers,
  beerById,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout beers={beers} beerById={beerById}>
      {(beerById) => <CardPage beersById={beerById} />}
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const searchParams = context.query;

    const id = context.params?.id;

    const searchValue = (searchParams[BeerQuery.Name] as string) || '';
    const pageNumber =
      (searchParams[BeerQuery.Page] as string) || Page_Number_Default;
    const limit = (searchParams[BeerQuery.Limit] as string) || Limit[2];
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

    const state = store.getState();

    const beerById = getBeerById.select(`${id}`)(state);

    const beers = getBeersArray.select({ searchValue, pageNumber, limit })(
      state
    );

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

export default BeerDetail;
