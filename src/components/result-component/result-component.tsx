import { Component } from 'react';
import './result-component.scss';
import { SearchPropsData } from '../../types/search-props';

class Results extends Component<SearchPropsData> {
  render() {
    return (
      <div className="content">
        {this.props.data.length === 0 && !this.props.info ? (
          <div className="content__empty">
            No results were found for your request
          </div>
        ) : (
          <div className="content__cards">
            {this.props.data.map((character) => {
              return (
                <div className="content__item" key={character.id}>
                  <h2>{character.name}</h2>
                  <img src={character.image} alt={character.name} />
                  <p>
                    Status: <b>{character.status}</b>
                  </p>
                  <p>
                    Gender: <b>{character.gender}</b>
                  </p>
                  <p>
                    Location: <b>{character.location.name}</b>
                  </p>
                </div>
              );
            })}
          </div>
        )}
        <div className="content__info">
          {this.props.data.length} of {this.props.info?.count || 0} shown
        </div>
      </div>
    );
  }
}

export default Results;
