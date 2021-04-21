import { combineReducers } from 'redux';

import widgetsById from './widgetsById';
import widgetTypes from './widgetTypes';

const widgets = combineReducers({
  widgetsById,
  widgetTypes
});

export default widgets;
