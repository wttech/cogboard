import { DATA_CHANGED, SAVE_DATA_SUCCESS } from '../../actions/types';

const isDataChanged = (state = false, { type }) => {
  switch (type) {
    case DATA_CHANGED:
      return true;
    case SAVE_DATA_SUCCESS:
      return false;
    default:
      return state;
  }
};

export default isDataChanged;