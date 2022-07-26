import React from 'react';
import { screen, waitFor } from "@testing-library/react";
import App from "../App";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import userEvent from '@testing-library/user-event';

let timer;

const player = {
  player: {
    name: 'Nome da pessoa',
    assertions: 5,
    score: 350,
    gravatarEmail: 'email@pessoa.com'
  }
}

const questions = {"response_code":0,"results":[
  {"category":"Entertainment: Video Games","type":"multiple","difficulty":"easy","question":"If a &quot;360 no-scope&quot; is one full rotation before shooting, how many rotations would a &quot;1080 no-scope&quot; be?","correct_answer":"3","incorrect_answers":["4","2","5"]},{"category":"Vehicles","type":"multiple","difficulty":"hard","question":"What engine is in the Lexus SC400?","correct_answer":"1UZ-FE","incorrect_answers":["2JZ-GTE","7M-GTE","5M-GE"]},{"category":"Entertainment: Film","type":"boolean","difficulty":"medium","question":"Joan Cusack starred in the 2009 disaster movie, &quot;2012&quot;.","correct_answer":"False","incorrect_answers":["True"]},{"category":"Entertainment: Video Games","type":"multiple","difficulty":"hard","question":"During development of &quot;Super Mario World&quot;, Yoshi&#039;s hard saddle was originally which of these?","correct_answer":"A shell","incorrect_answers":["A slide of Gelatin","A poffin","A spike"]},{"category":"Geography","type":"multiple","difficulty":"medium","question":"The Pyrenees mountains are located on the border of which two countries?","correct_answer":"France and Spain","incorrect_answers":["Italy and Switzerland","Norway and Sweden","Russia and Ukraine"]}]}

const expiredToken = {"response_code":0,"results":[]};

describe('Testa o token expirado', () => {
  test('', () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({json: () => expiredToken});
    renderWithRouterAndRedux(<App />, player);
    userEvent.type(screen.getByPlaceholderText(/Nome/i), player.player.name);
    userEvent.type(screen.getByPlaceholderText(/Email/i), player.player.gravatarEmail);
    userEvent.click(screen.getByRole('button', {  name: /play/i}));
  });
});

describe('Tela de Jogo', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({json: () => questions});
    jest.useFakeTimers();
    renderWithRouterAndRedux(<App />, player);
    userEvent.type(screen.getByPlaceholderText(/Nome/i), player.player.name);
    userEvent.type(screen.getByPlaceholderText(/Email/i), player.player.gravatarEmail);
    userEvent.click(screen.getByRole('button', {  name: /play/i}));
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('Testa o timer', async () => {
    expect(screen.getByText(/loading\.\.\./i)).toBeInTheDocument();
    timer = await screen.findByRole('heading', {  name: /tempo/i});
    expect(timer).toHaveTextContent('30');
    await waitFor(() => expect(timer).toHaveTextContent('29'));
    jest.advanceTimersByTime(30000);
    const nextBtnEl = screen.getByRole('button', {  name: /next/i});
    expect(nextBtnEl).toBeInTheDocument();
  });

  test('Testa as respostas', async () => {
    let answer = await screen.findByTestId('wrong-answer-0');
    userEvent.click(answer);
    let nextBtnEl = screen.getByRole('button', {  name: /next/i});
    userEvent.click(nextBtnEl);

    for (let i = 1; i <= 4; i += 1) {
      answer = await screen.findByTestId('correct-answer');
      userEvent.click(answer);
      nextBtnEl = screen.getByRole('button', {  name: /next/i});
      userEvent.click(nextBtnEl);
    }
  })
});