import {LOGIN_ERROR, LOGIN_SUCCESS} from '../../actions/types';

const jwToken = (state = '', { type, payload }) => {
  switch (type) {
    case LOGIN_ERROR:
      return '';
    case LOGIN_SUCCESS:
      return payload;
    default:
      return state;
  }
};

export default jwToken;