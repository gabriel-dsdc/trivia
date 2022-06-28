import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { name, email, score } = this.props;

    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${md5(email)}` }
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

const mapStateToProps = (state) => {
  console.log(state);
  return {
    name: state.login.name,
    email: state.login.email,
    score: state.player.score,
  };
};

Header.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
