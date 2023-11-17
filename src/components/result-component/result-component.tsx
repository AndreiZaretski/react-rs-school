import './result-component.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/store/store';
import { useGetBeersArrayQuery } from '../../redux/api/beerApi';
import LoadingComponent from '../loadingComponent/LoadingComponent';
import { setLengthValue } from '../../redux/features/dataLengthSlice';
import { setLoadingValue } from '../../redux/features/isLoading';
import { useCallback, useEffect } from 'react';

const Results = () => {
  const dispatch = useDispatch();
  const searchParams = useSelector((state: AppState) => state.searchParams);

  const { data, error, isLoading } = useGetBeersArrayQuery(searchParams);

  const dispatchLoading = useCallback(() => {
    if (data) {
      dispatch(setLengthValue(data.length));
    }

    dispatch(setLoadingValue(isLoading));
  }, [data, dispatch, isLoading]);

  useEffect(() => {
    dispatchLoading();
  }, [dispatchLoading]);

  return isLoading ? (
    <LoadingComponent />
  ) : (
    <div className="content">
      {error || !data || data.length === 0 ? (
        <div role="empty" className="content__empty">
          No results were found for your request
        </div>
      ) : (
        <div className="content__cards">
          {data.map((beer) => {
            return (
              <Link to={`/beer/${beer.id}`} key={beer.id}>
                <div role="card" className="content__item">
                  <h3>{beer.name}</h3>
                  <div className="content__img">
                    <img src={beer.image_url} alt={beer.name} />
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
      <div className="content__info">
        {data ? data.length : 0} of {325} shown
      </div>
    </div>
  );
};

export default Results;
