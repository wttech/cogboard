import { mergeRight } from 'ramda';

import { SAVE_SETTINGS } from '../../actions/types';

const initState = {
  endpoints: [],
  credentials: []
};

const saveSettings = (state, payload) => mergeRight(state, payload);

const settings = (state = initState, { type, payload }) => {
  switch (type) {
    case SAVE_SETTINGS:
      return saveSettings(state, payload);
    default:
      return state;
  }
};

export default settings;
