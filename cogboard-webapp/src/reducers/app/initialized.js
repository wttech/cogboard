import { RECEIVE_DATA } from '../../actions/types';

const initialized = (state = false, { type }) => {
  return type === RECEIVE_DATA ? true : state;
};

export default initialized;