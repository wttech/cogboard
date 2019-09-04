import { LOGIN_ERROR, LOGIN_SUCCESS } from '../../actions/types';

const loginErrorMessage = (state = '', { type, payload }) => {
  switch (type) {
    case LOGIN_ERROR:
      return payload;
    case LOGIN_SUCCESS:
      return '';
    default:
      return state;
  }
};

export default loginErrorMessage;