import { combineReducers } from 'redux';

import app from './app';
import boards from './boards';
import widgets from './widgets';

const rootReducer = combineReducers({
  app,
  boards,
  widgets
});

export default rootReducer;