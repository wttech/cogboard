import { RECEIVE_DATA, EDIT_BOARD, DELETE_BOARD, ADD_WIDGET, DELETE_WIDGET, ADD_BOARD } from '../../actions/types';

const receiveData = (state, { payload }) => {
  const { boards: { boardsById } } = payload;

  return { ...state, ...boardsById };
};

const addBoard = (state, { payload }) => {
  const { id } = payload;

  return { ...state, [id]: payload };
};

const editBoard = (state, { payload }) => {
  const { id, ...other } = payload;
  const board = state[id];

  return {
    ...state,
    [id]: { ...board, ...other }
  }
};

const deleteBoard = (state, { payload: id }) => {
  const { [id]: deletedBoard, ...rest } = state;

  return { ...rest };
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
};

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
};

const boardsById = (state = {}, action) => {
  const { type } = action;

  switch (type) {
    case RECEIVE_DATA:
      return receiveData(state, action);
    case ADD_BOARD:
      return addBoard(state, action);
    case EDIT_BOARD:
      return editBoard(state, action);
    case DELETE_BOARD:
      return deleteBoard(state, action);
    case ADD_WIDGET:
      return addWidget(state, action);
    case DELETE_WIDGET:
      return deleteWidget(state, action);
    default:
      return state;
  }
};

export default boardsById;