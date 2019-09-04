import { LOGIN_SUCCESS } from '../../actions/types';

const isAdmin = (state = false, { type, payload }) => {
  return type === LOGIN_SUCCESS ? payload !== '' : state;
};

export default isAdmin;