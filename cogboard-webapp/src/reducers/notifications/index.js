import { combineReducers } from 'redux';

import notificationsById from './notificationsById';
import allNotifications from './allNotifications';
import isNewVersionNotificationVisible from './isNewVersionNotificationVisible';

const notifications = combineReducers({
  notificationsById,
  allNotifications,
  isNewVersionNotificationVisible
});

export default notifications;
