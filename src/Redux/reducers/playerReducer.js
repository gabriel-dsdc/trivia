import { USER_NAME_EMAIL, PLAYER_ASSERTIONS, PLAYER_SCORE } from '../actions/index';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_NAME_EMAIL:
    return { ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email };
  case PLAYER_SCORE:
    return {
      ...state,
      score: action.score,
    };
  case PLAYER_ASSERTIONS:
    return {
      ...state,
      assertions: action.assertions,
    };
  default:
    return state;
  }
};

export default playerReducer;
