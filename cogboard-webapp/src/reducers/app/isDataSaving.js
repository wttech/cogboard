import { SAVE_DATA_START, SAVE_DATA_SUCCESS } from '../../actions/types';

const isDataSaving = (state = false, { type }) => {
  switch (type) {
    case SAVE_DATA_START:
      return true;
    case SAVE_DATA_SUCCESS:
      return false;
    default:
      return state;
  }
};

export default isDataSaving;