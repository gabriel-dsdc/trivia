import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Feedback extends Component {
  render() {
    const { assertions, score, gravatarEmail, name } = this.props;
    const defaultAssertions = 3;
    return (
      <>
        <div>
          <img
            src={ `https://www.gravatar.com/avatar/${md5(gravatarEmail)}` }
            data-testid="header-profile-picture"
            alt="avatar"
          />
          <h4 data-testid="header-player-name">
            Nome:
            { name }
          </h4>
          <h4>
            Score:
            <span data-testid="header-score">{ score }</span>
          </h4>
        </div>
        <div>
          Feedback
          {
            assertions >= defaultAssertions
              ? <div data-testid="feedback-text"> Well Done!</div>
              : <div data-testid="feedback-text"> Could be better...</div>
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
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
