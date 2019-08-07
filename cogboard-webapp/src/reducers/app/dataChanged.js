import { CHANGE_DATA, SAVE_DATA_SUCCESS } from '../../actions/types';

const dataChanged = (state = false, { type }) => {
  switch (type) {
    case CHANGE_DATA:
      return true;
    case SAVE_DATA_SUCCESS:
      return false;
    default:
      return state;
  }
};

export default dataChanged;