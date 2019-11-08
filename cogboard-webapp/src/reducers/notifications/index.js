import { combineReducers } from 'redux';

import notificationsById from './notificationsById';
import allNotifications from './allNotifications';

const notifications = combineReducers({
  notificationsById,
  allNotifications
});

export default notifications;
