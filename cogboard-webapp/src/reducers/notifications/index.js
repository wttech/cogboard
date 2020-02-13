import { combineReducers } from 'redux';

import notificationsById from './notificationsById';
import allNotifications from './allNotifications';
import isWaitingForNewVersion from './isWaitingForNewVersion';

const notifications = combineReducers({
  notificationsById,
  allNotifications,
  isWaitingForNewVersion
});

export default notifications;
