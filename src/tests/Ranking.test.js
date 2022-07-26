import React from 'react';
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Ranking from "../pages/Ranking";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";

let history;
let playAgainBtnEl;

const ranking = [
  {name: 'Nome da pessoa', score: 350, picture: 'https://www.gravatar.com/avatar/c19ad9dbaf91c5533605fbf985177ccc'},
  {name: 'Outra pessoa', score: 0, picture: 'https://www.gravatar.com/avatar/9df2e312cb9997ff33b8d80489bffb52'},
  {name: 'Mais uma pessoa', score: 40, picture: 'https://www.gravatar.com/avatar/0709b2ce6680b252eaf501fd25565bdb'},
];

describe('Tela de Ranking', () => {
  beforeEach(() => {
    window.localStorage.setItem('ranking', JSON.stringify(ranking));
    history = renderWithRouterAndRedux(<Ranking />).history;

    playAgainBtnEl = screen.getByRole('button', {  name: /play again/i});
});

  test('Verifica se tudo se encontra na tela', () => {
    const rankingTitleEl = screen.getByRole('heading', {  name: /ranking:/i});
    expect(rankingTitleEl).toBeInTheDocument();
    expect(playAgainBtnEl).toBeInTheDocument();
  });

  test('Verifica os botões', () => {
    userEvent.click(playAgainBtnEl);

    waitFor(() => {
      expect(history.location.pathname).toBe('/');
    });
  });
});