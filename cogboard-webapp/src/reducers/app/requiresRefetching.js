import { REFETCH_DATA } from '../../actions/types';

const requiresRefetching = (state = false, { type }) => {
  return type === REFETCH_DATA;
};

export default requiresRefetching;
