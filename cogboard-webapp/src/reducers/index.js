import { combineReducers } from 'redux';

import app from './app';
import ui from './ui';
import boards from './boards';
import widgets from './widgets';
import notifications from './notifications';

const rootReducer = combineReducers({
  app,
  ui,
  boards,
  widgets,
  notifications
});

export default rootReducer;