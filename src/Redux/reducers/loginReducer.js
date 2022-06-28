import { USER_NAME_EMAIL } from '../actions/index';

const INITIAL_STATE = {
  name: '',
  email: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_NAME_EMAIL:
    return { ...state,
      name: action.payload.name,
      email: action.payload.email };
  default:
    return state;
  }
};

export default loginReducer;
