import { SET_LOGOUT_REASON_MESSAGE, LOGOUT } from '../../actions/types';

const logoutReasonMessage = (state = '', { type, payload }) => {
  switch (type) {
    case SET_LOGOUT_REASON_MESSAGE:
      return payload;
    case LOGOUT:
      return '';
    default:
      return state;
  }
};

export default logoutReasonMessage;
