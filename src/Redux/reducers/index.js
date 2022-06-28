import { combineReducers } from 'redux';
import playerReducer from './playerReducer';
import loginReducer from './loginReducer';

const rootReducer = combineReducers({
  player: playerReducer,
  login: loginReducer,
});

export default rootReducer;
