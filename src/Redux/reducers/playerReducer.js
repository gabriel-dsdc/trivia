import { PLAYER_ASSERTIONS, PLAYER_SCORE } from '../actions/index';

const INITIAL_STATE = {
  assertions: 0,
  score: 0,
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
