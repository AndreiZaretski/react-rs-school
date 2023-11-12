import { Link, useParams } from 'react-router-dom';
import { BeerSort } from '../../types/response-interface';
import './CardPage.scss';
import axios from 'axios';
import { useCallback, useContext, useEffect, useState } from 'react';
import { API_URL } from '../../constants/request-url';
import { isValidResult } from '../../helper/checkData';
import LoadingComponent from '../../components/loadingComponent/LoadingComponent';
import { Context } from '../../constants/context';

export interface CardPageProps {
  data: BeerSort | null;
}
const CardPage = (data: CardPageProps) => {
  const { id } = useParams();
  const [beer, setData] = useState<BeerSort | null>(data.data);
  const { isLoading, setIsLoading } = useContext(Context);

  const getBeerData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios({
        url: `${API_URL.baseUrl}${API_URL.endpoint}${id}`,
      });

      if (response.data && isValidResult(response.data)) {
        setIsLoading(false);
        setData(response.data[0]);
      }
    } catch (error) {
      setIsLoading(false);
      setData(null);
    }
  }, [id, setIsLoading]);

  useEffect(() => {
    getBeerData();
  }, [getBeerData]);

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
        ) : beer ? (
          <>
            <div className="card-page__detail" role="detail">
              <h2>{beer.name}</h2>
              <div className="card-page__img">
                <img src={beer.image_url} alt={beer.name} role="img" />
              </div>
              <p>
                Tag: <b>{beer.tagline}</b>
              </p>
              <p>
                Description: <b>{beer.description}</b>
              </p>
              <p>
                Date relase: <b>{beer.first_brewed}</b>
              </p>
              <p>
                Contributed: <b>{beer.contributed_by}</b>
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
