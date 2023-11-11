import './result-component.scss';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../constants/context';

const Results = () => {
  const { data } = useContext(Context);
  return (
    <div className="content">
      {data.length === 0 ? (
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
        {data.length} of {325} shown
      </div>
    </div>
  );
};

export default Results;
