import './result-component.scss';
import { SearchPropsData } from '../../types/search-props';
import { Link } from 'react-router-dom';

const Results = (props: SearchPropsData) => {
  return (
    <div className="content">
      {props.data.length === 0 ? (
        <div className="content__empty">
          No results were found for your request
        </div>
      ) : (
        <div className="content__cards">
          {props.data.map((beer) => {
            return (
              <Link to={`/${beer.id}`} key={beer.id}>
                <div className="content__item">
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
        {props.data.length} of {325} shown
      </div>
    </div>
  );
};

export default Results;
