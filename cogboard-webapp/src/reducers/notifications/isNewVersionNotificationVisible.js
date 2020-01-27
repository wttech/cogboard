import {
  SET_NEW_VERSION_NOTIFICATION_VISIBLE,
  SET_NEW_VERSION_NOTIFICATION_INVISIBLE
} from '../../actions/types';

const isNewVersionNotificationVisible = (state = false, { type }) => {
  switch (type) {
    case SET_NEW_VERSION_NOTIFICATION_VISIBLE:
      return true;
    case SET_NEW_VERSION_NOTIFICATION_INVISIBLE:
      return false;
    default:
      return state;
  }
};

export default isNewVersionNotificationVisible;
