import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Questions from '../components/Questions';

class Game extends Component {
  state = {
    timer: 30,
  }

  handleTimer = () => {
    const { timer } = this.state;
    if (timer !== 0) {
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
    }
  };

  render() {
    const { history } = this.props;
    return (
      <>
        <Header />
        <h1>TELA DE JOGO</h1>
        <Questions historyProp={ history } />
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape(Object).isRequired,
};

export default Game;
