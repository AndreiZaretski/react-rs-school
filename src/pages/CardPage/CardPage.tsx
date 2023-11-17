import { Link, useParams } from 'react-router-dom';
import { BeerSort } from '../../types/response-interface';
import './CardPage.scss';
import LoadingComponent from '../../components/loadingComponent/LoadingComponent';
import { useGetBeerByIdQuery } from '../../redux/api/beerApi';
import { skipToken } from '@reduxjs/toolkit/query';

export interface CardPageProps {
  data: BeerSort | null;
}
const CardPage = () => {
  const { id } = useParams();

  const { data, error, isLoading } = useGetBeerByIdQuery(id ?? skipToken);
  console.log(error);
  return (
    <div className="card-page" role="cartPage">
      <div className="card-page__content">
        <Link to={`/beer`} role="buttonLink">
          <button className="card-page__button">Back</button>
        </Link>
        {isLoading ? (
          <div className="loading" role="loading">
            <LoadingComponent />
          </div>
        ) : data ? (
          <>
            <div className="card-page__detail" role="detail">
              <h2>{data[0].name}</h2>
              <div className="card-page__img">
                <img src={data[0].image_url} alt={data[0].name} role="img" />
              </div>
              <p>
                Tag: <b>{data[0].tagline}</b>
              </p>
              <p>
                Description: <b>{data[0].description}</b>
              </p>
              <p>
                Date relase: <b>{data[0].first_brewed}</b>
              </p>
              <p>
                Contributed: <b>{data[0].contributed_by}</b>
              </p>
            </div>
          </>
        ) : (
          <div className="card-page__empty">
            No results were found for your request
          </div>
        )}
      </div>
    </div>
  );
};

export default CardPage;
