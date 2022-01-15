import { combineReducers } from 'redux';

import widgetsById from './widgetsById';
import widgetTypes from './widgetTypes';
import logsViewersCache from './logsViewers';

const widgets = combineReducers({
  widgetsById,
  widgetTypes,
  logsViewersCache
});

export default widgets;
