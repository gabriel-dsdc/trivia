import React, { Component } from 'react';
import Header from '../components/Header';
import Questions from '../components/Questions';

class Game extends Component {
  render() {
    return (
      <>
        <Header />
        <h1>TELA DE JOGO</h1>
        <Questions />
      </>
    );
  }
}

export default Game;
