import { combineReducers } from 'redux';

import currentBoard from './currentBoard';

const ui = combineReducers({
  currentBoard
});

export default ui;