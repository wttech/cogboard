import { RECEIVE_DATA, ADD_WIDGET, DELETE_WIDGET } from '../../actions/types';

const receiveData = (state, { payload }) => {
  const { boards: { boardsById } } = payload;

  return {
    ...state,
    ...boardsById
  };
};

const addWidget = (state, { payload }) => {
  const { id, boardId } = payload;
  const board = state[boardId];
  const widgets = board.widgets;

  return {
    ...state,
    [boardId]: {
      ...board,
      widgets: [...widgets, id]
    }
  };
}

const deleteWidget = (state, { payload }) => {
  const { id, boardId } = payload;
  const board = state[boardId];
  const widgets = board.widgets;

  return {
    ...state,
    [boardId]: {
      ...board,
      widgets: widgets.filter(widgetId => widgetId !== id)
    }
  };
}

const boardsById = (state = {}, action) => {
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
};

export default boardsById;