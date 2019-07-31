import { combineReducers } from 'redux';

import widgetsById from './widgetsById';
import allWidgets from './allWidgets';

const widgets = combineReducers({
  widgetsById,
  allWidgets
});

export default widgets;
