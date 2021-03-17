import {
  GUEST_LOGIN_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT
} from '../../actions/types';

const guestLogin = (state = {}, { type, payload }) => {
  switch (type) {
    case GUEST_LOGIN_SUCCESS:
      return {
        isGuest: (payload || '') !== '',
        guestName: payload
      };
    case LOGIN_SUCCESS:
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default guestLogin;
