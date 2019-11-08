import {
  RECEIVE_DATA,
  ADD_WIDGET,
  DELETE_WIDGET,
  DELETE_MULTIPLE_WIDGETS
} from '../../actions/types';

const receiveData = (state, { payload }) => {
  const {
    widgets: { allWidgets }
  } = payload;

  return [...state, ...allWidgets];
};

const addWidget = (state, { payload }) => {
  const { id } = payload;

  return [...state, id];
};

const deleteWidget = (state, { payload }) => {
  const { id } = payload;

  return state.filter(widgetId => widgetId !== id);
};

const deleteMultipleWidgets = (state, { payload }) => {
  const { widgetIds } = payload;

  return state.filter(widgetId => !widgetIds.includes(widgetId));
};

const allWidgets = (state = [], action) => {
  const { type } = action;

  switch (type) {
    case RECEIVE_DATA:
      return receiveData(state, action);
    case ADD_WIDGET:
      return addWidget(state, action);
    case DELETE_WIDGET:
      return deleteWidget(state, action);
    case DELETE_MULTIPLE_WIDGETS:
      return deleteMultipleWidgets(state, action);
    default:
      return state;
  }
};

export default allWidgets;
