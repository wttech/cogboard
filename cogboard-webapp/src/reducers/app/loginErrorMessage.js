import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT } from '../../actions/types';

const loginErrorMessage = (state = '', { type, payload }) => {
  switch (type) {
    case LOGIN_FAILURE:
      return payload;
    case LOGIN_SUCCESS:
    case LOGOUT:
      return '';
    default:
      return state;
  }
};

export default loginErrorMessage;