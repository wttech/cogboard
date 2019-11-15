import { PUSH_NOTIFICATION, DELETE_NOTIFICATION } from '../../actions/types';
import { assoc, dissoc } from 'ramda';

const pushNotification = (state, payload) => {
  const { id } = payload;

  return assoc(id, payload, state);
};

const deleteNotification = (state, payload) => {
  const id = payload;

  return dissoc(id, state);
};

const notificationsById = (state = {}, { type, payload }) => {
  switch (type) {
    case PUSH_NOTIFICATION:
      return pushNotification(state, payload);
    case DELETE_NOTIFICATION:
      return deleteNotification(state, payload);
    default:
      return state;
  }
};

export default notificationsById;
