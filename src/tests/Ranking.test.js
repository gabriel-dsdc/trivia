import React from 'react';
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Ranking from "../pages/Ranking";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";

let history;
let playAgainBtnEl;

describe('Tela de Ranking', () => {
  beforeEach(() => {
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