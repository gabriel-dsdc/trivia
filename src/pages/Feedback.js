import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions, score } = this.props;
    const defaultAssertions = 3;
    return (
      <>
        <Header />
        <div
          data-testid="feedback-text"
        >
          Feedback
          {
            assertions < defaultAssertions
              ? <h2> Could be better...</h2>
              : <h2> Well Done!</h2>
          }
        </div>
        <div>Pontuação: </div>
        <div data-testid="feedback-total-score">
          { score }
        </div>
        <div>Acertos:</div>
        <div data-testid="feedback-total-question">

          { assertions }
        </div>
        <Link to="/">
          <button
            data-testid="btn-play-again"
            type="button"
          >
            Play Again
          </button>
        </Link>
        <Link to="/ranking">
          <button
            data-testid="btn-ranking"
            type="button"
          >
            Ranking
          </button>
        </Link>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
