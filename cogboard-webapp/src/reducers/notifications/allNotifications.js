import { append, without } from 'ramda';

import { PUSH_NOTIFICATION, DELETE_NOTIFICATION } from '../../actions/types';

const pushNotification = (state, { id }) => append(id, state);

const deleteNotification = (state, id) => without([id], state);

const allNotifications = (state = [], { type, payload }) => {
  switch (type) {
    case PUSH_NOTIFICATION:
      return pushNotification(state, payload);
    case DELETE_NOTIFICATION:
      return deleteNotification(state, payload);
    default:
      return state;
  }
};

export default allNotifications;