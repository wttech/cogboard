import { RECEIVE_DATA, ADD_WIDGET, DELETE_WIDGET } from '../../actions/types';

const receiveData = (state, { payload }) => {
  const { widgets: { allWidgets } } = payload;

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

const allWidgets = (state = [], action) => {
  const { type } = action;

  switch (type) {
    case RECEIVE_DATA:
      return receiveData(state, action);
    case ADD_WIDGET:
      return addWidget(state, action);
    case DELETE_WIDGET:
      return deleteWidget(state, action);
    default:
      return state;
  }
}

export default allWidgets;