import { combineReducers } from 'redux';

import boardsById from './boardsById';
import allBoards from './allBoards';

const boards = combineReducers({
  boardsById,
  allBoards
});

export default boards;
