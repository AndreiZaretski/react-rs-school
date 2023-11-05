import { Link, useParams } from 'react-router-dom';
import { BeerSort } from '../../types/response-interface';
import './CardPage.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_URL } from '../../constants/request-url';
import { isValidResult } from '../../helper/checkData';
import LoadingComponent from '../../components/loadingComponent/LoadingComponent';

const CardPage = () => {
  const { id } = useParams();
  const [beer, setData] = useState<BeerSort | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const sendRequest = async () => {
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
    };
    sendRequest();
  }, [id]);

  return (
    <div className="card-page">
      <div className="card-page__content">
        <Link to={`/`}>
          <button className="card-page__button">Back</button>
        </Link>
        {isLoading ? (
          <LoadingComponent />
        ) : beer ? (
          <>
            <h2>{beer.name}</h2>
            <div className="card-page__img">
              <img src={beer.image_url} alt={beer.name} />
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
