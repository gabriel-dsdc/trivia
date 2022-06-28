export const USER_NAME_EMAIL = 'USER_NAME_EMAIL';
export const PLAYER_SCORE = 'PLAYER_SCORE';
export const PLAYER_ASSERTIONS = 'PLAYER_ASSERTIONS';

export const setUserName = ({ name, email }) => ({
  type: USER_NAME_EMAIL,
  payload: {
    name,
    email,
  },
});

export const setPlayerScore = (score) => ({
  type: PLAYER_SCORE,
  score,
});

export const setPlayerAssertions = (assertions) => ({
  type: PLAYER_ASSERTIONS,
  assertions,
});
