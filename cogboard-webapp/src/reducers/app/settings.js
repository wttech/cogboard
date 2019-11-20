import { SAVE_SETTINGS } from '../../actions/types';

const initState = {
  endpoints: [],
  credentials: []
};

const settings = (state = initState, { type, payload }) => {
  switch (type) {
    case SAVE_SETTINGS:
      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
};

export default settings;
