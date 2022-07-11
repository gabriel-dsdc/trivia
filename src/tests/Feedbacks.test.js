import React from 'react';
import { screen } from "@testing-library/react";
import App from '../App';
import playerMock from './mocks/playerMock';
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";

describe('Tela de Feedbacks', () => {
  test('Verifica se tudo está na tela com seus valores padrões', () => {
    renderWithRouterAndRedux(<App />, playerMock, '/feedback');

    let nameEl = screen.getByRole('heading', {  name: /nome:/i});
    let scoreEl = screen.getByRole('heading', {  name: /score:/i});
    let feedbackTextEl = screen.getByTestId(/feedback-text/i);
    let totalScoreEl = screen.getByTestId(/feedback-total-score/i);
    let totalAssertionsEl = screen.getByTestId(/feedback-total-question/i);

    expect(nameEl).toBeInTheDocument();
    expect(scoreEl).toBeInTheDocument();
    expect(feedbackTextEl).toBeInTheDocument();
    expect(totalScoreEl).toBeInTheDocument();
    expect(totalAssertionsEl).toBeInTheDocument();
  });

  test('Verifica se as informações exibidas na tela estão corretas', () => {
    renderWithRouterAndRedux(<App />, playerMock, '/feedback');

    let nameEl = screen.getByRole('heading', {  name: /nome:/i});
    let scoreEl = screen.getByRole('heading', {  name: /score:/i});
    let feedbackTextEl = screen.getByTestId(/feedback-text/i);
    let totalScoreEl = screen.getByTestId(/feedback-total-score/i);
    let totalAssertionsEl = screen.getByTestId(/feedback-total-question/i);

    expect(nameEl).toHaveTextContent(/nome da pessoa/i);
    expect(scoreEl).toHaveTextContent('350');
    expect(feedbackTextEl).toHaveTextContent(/well done!/i);
    expect(totalScoreEl).toHaveTextContent('350');
    expect(totalAssertionsEl).toHaveTextContent(/4/i);
  });

  test('Verifica as informações com poucos acertos', () => {
    renderWithRouterAndRedux(<App />, {player: {...playerMock.player, assertions: 1}}, '/feedback');

    let totalAssertionsEl = screen.getByTestId(/feedback-total-question/i);
    let feedbackTextEl = screen.getByTestId(/feedback-text/i);

    expect(feedbackTextEl).toHaveTextContent(/could be better\.\.\./i);
    expect(totalAssertionsEl).toHaveTextContent('1');
  })
});