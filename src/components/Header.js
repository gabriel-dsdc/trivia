import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { name, gravatarEmail, score } = this.props;

    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${md5(gravatarEmail)}` }
          data-testid="header-profile-picture"
          alt="avatar"
        />
        <h4 data-testid="header-player-name">
          Nome:
          { ' ' }
          { name }
        </h4>
        <h4>
          Placar:
        </h4>
        <h4 data-testid="header-score">{ score }</h4>
      </header>
    );
  }
}

const mapStateToProps = ({ player: { name, score, gravatarEmail } }) => ({
  name,
  score,
  gravatarEmail,
});

Header.propTypes = {
  name: PropTypes.string,
  gravetarEmail: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Header);
