import Layout from '@/components/layout/layout';
import { BeerQuery } from '@/constants/request-url';
import { Limit, Page_Number_Default } from '@/constants/searchParam';
import { getBeersArray, getRunningQueriesThunk } from '@/redux/api/beerApi';
import { wrapper } from '@/redux/store/store';
import { BeerSort } from '@/types/response-interface';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

function Beer({
  beers,
  dataLength,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <Layout beers={beers} beerById={null} dataLength={dataLength} />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const searchParams = context.query;

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

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    const state = store.getState();

    const beers = getBeersArray.select({ searchValue, pageNumber, limit })(
      state
    );

    const dataLength = beers.data?.length;

    return {
      props: {
        beers: beers.data && !beers.isLoading && !beers.error ? beers.data : [],
        dataLength: dataLength || 0,
      },
    };
  }
) satisfies GetServerSideProps<{
  beers: BeerSort[];
  dataLength: number;
}>;

export default Beer;
