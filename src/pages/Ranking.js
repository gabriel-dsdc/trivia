import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    return (
      <>
        <h1 data-testid="ranking-title">Ranking:</h1>
        {JSON.parse(localStorage.getItem('ranking')).sort((a, b) => b.score - a.score)
          .map(({ name, score }, index) => (
            <React.Fragment key={ index }>
              <p data-testid={ `player-name-${index}` }>{name}</p>
              <p data-testid={ `player-score-${index}` }>{score}</p>
            </React.Fragment>
          ))}
        <Link to="/">
          <button
            data-testid="btn-go-home"
            type="button"
          >
            Play Again
          </button>
        </Link>
      </>
    );
  }
}

export default Ranking;
