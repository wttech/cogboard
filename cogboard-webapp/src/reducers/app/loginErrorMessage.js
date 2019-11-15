import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  CLEAR_LOGIN_ERROR_MESSAGE,
  LOGOUT
} from '../../actions/types';

const loginErrorMessage = (state = '', { type, payload }) => {
  switch (type) {
    case LOGIN_FAILURE:
      return payload;
    case LOGIN_SUCCESS:
    case CLEAR_LOGIN_ERROR_MESSAGE:
    case LOGOUT:
      return '';
    default:
      return state;
  }
};

export default loginErrorMessage;
