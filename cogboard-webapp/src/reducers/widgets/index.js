import { combineReducers } from 'redux';

import widgetsById from './widgetsById';
import allWidgets from './allWidgets';
import widgetTypes from './widgetTypes';

const widgets = combineReducers({
  widgetsById,
  allWidgets,
  widgetTypes
});

export default widgets;
