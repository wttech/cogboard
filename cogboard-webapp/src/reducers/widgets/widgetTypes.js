import { RECEIVE_DATA } from '../../actions/types';

const receiveData = (state, { payload }) => {
  const {
    widgets: { widgetTypes }
  } = payload;

  return [...state, ...widgetTypes];
};

const widgetTypes = (state = [], action) => {
  const { type } = action;

  switch (type) {
    case RECEIVE_DATA:
      return receiveData(state, action);
    default:
      return state;
  }
};

export default widgetTypes;
