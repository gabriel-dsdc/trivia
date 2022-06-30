import React from 'react';
import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import App from "../App"
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Tela de Login', () => {
  const PLAYER_NAME = 'Nome da pessoa';
  const PLAYER_EMAIL = 'email@pessoa.com';
  const INPUT_PLAYER_NAME_SELECTOR = 'input-player-name';
  const INPUT_PLAYER_EMAIL_SELECTOR = 'input-gravatar-email';
  
  test('Verifica se tudo se encontra na tela', () => {
    renderWithRouterAndRedux(<App/>);

    const nameInput = screen.getByTestId(INPUT_PLAYER_NAME_SELECTOR);
    const emailInput = screen.getByTestId(INPUT_PLAYER_EMAIL_SELECTOR);
    const playButtonEl = screen.getByRole('button', {name: /play/i});
    const settingsButtonEl = screen.getByRole('button', {name: /configurações/i});

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(playButtonEl).toBeInTheDocument();
    expect(settingsButtonEl).toBeInTheDocument();

    userEvent.type(nameInput, PLAYER_NAME);
    userEvent.type(emailInput, PLAYER_EMAIL);
    expect(nameInput.value).toBe(PLAYER_NAME);
    expect(emailInput.value).toBe(PLAYER_EMAIL);
  })

  test("Verifica se o botão 'Play' está desabilitado", () => {
    renderWithRouterAndRedux(<App/>);

    const nameInput = screen.getByTestId(INPUT_PLAYER_NAME_SELECTOR);
    const emailInput = screen.getByTestId(INPUT_PLAYER_EMAIL_SELECTOR);
    const playButtonEl = screen.getByRole('button', {name: /play/i});

    expect(playButtonEl).toBeDisabled();
    userEvent.type(nameInput, PLAYER_NAME);
    expect(playButtonEl).toBeDisabled();
    userEvent.type(emailInput, PLAYER_EMAIL);
    expect(playButtonEl).not.toBeDisabled();
  })

  test("Verifica se ao apertar em 'Play' é redirecionado", () => {
    const {history} = renderWithRouterAndRedux(<App/>);

    const nameInput = screen.getByTestId(INPUT_PLAYER_NAME_SELECTOR);
    const emailInput = screen.getByTestId(INPUT_PLAYER_EMAIL_SELECTOR);
    const playButtonEl = screen.getByRole('button', {name: /play/i});

    userEvent.type(nameInput, PLAYER_NAME);
    userEvent.type(emailInput, PLAYER_EMAIL);
    userEvent.click(playButtonEl);
    waitFor(() => {
      expect(history.location.pathname).toBe('/game');
    });
  })

  test("Verifica se ao apertar em 'Configurações' vai para a página certa", () => {
    const {history} = renderWithRouterAndRedux(<App/>);

    const settingsButtonEl = screen.getByRole('button', {name: /configurações/i});
    expect(settingsButtonEl).toBeInTheDocument();
    userEvent.click(settingsButtonEl);

    expect(history.location.pathname).toBe('/settings');
    
    const settingsTitleEl = screen.getByRole('heading', {name: /configurações/i})
    expect(settingsTitleEl).toBeInTheDocument();
  })
})