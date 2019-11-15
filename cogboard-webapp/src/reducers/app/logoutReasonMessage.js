import {
  SET_LOGOUT_REASON_MESSAGE,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  CLEAR_LOGIN_ERROR_MESSAGE,
  LOGOUT
} from '../../actions/types';

const loginErrorMessage = (state = '', { type, payload }) => {
  switch (type) {
    case LOGIN_FAILURE:
    case SET_LOGOUT_REASON_MESSAGE:
      return payload;
    case LOGIN_SUCCESS:
    case CLEAR_LOGIN_ERROR_MESSAGE:
    //case CLEAR_LOGOUT_REASON_MESSAGE:
    case LOGOUT:
      return '';
    default:
      return state;
  }
};

export default loginErrorMessage;
