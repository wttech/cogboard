import { combineReducers } from 'redux';

import app from './app';
import ui from './ui';
import boards from './boards';
import widgets from './widgets';

const rootReducer = combineReducers({
  app,
  ui,
  boards,
  widgets
});

export default rootReducer;