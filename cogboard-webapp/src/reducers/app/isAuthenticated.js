import { LOGIN_SUCCESS, LOGOUT } from '../../actions/types';

const isAuthenticated = (state = false, { type }) => {
  switch (type) {
    case LOGIN_SUCCESS:
      return true;
    case LOGOUT:
      return false;
    default:
      return state;
  }
};

export default isAuthenticated;