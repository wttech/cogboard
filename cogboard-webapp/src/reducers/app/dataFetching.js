import { REQUEST_DATA } from '../../actions/types';

const dataFetching = (state = false, { type }) => {
  return type === REQUEST_DATA ? true : state;
};

export default dataFetching;