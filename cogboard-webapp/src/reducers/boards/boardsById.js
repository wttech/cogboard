import {
  RECEIVE_DATA,
  ADD_BOARD,
  EDIT_BOARD,
  DELETE_BOARD,
  ADD_WIDGET,
  DELETE_WIDGET,
  SORT_WIDGETS,
  INIT_BOARD_PROPS
} from '../../actions/types';

import { reorderItems } from '../helpers';

const receiveData = (state, { payload }) => {
  const {
    boards: { boardsById }
  } = payload;

  return { ...state, ...boardsById };
};

const initBoardProps = (state, { payload }) => {
  return Object.entries(state).reduce((newState, [boardId, boardProps]) => {
    newState[boardId] = { ...payload, ...boardProps };

    return newState;
  }, {});
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
  };
};

const deleteBoard = (state, { payload: id }) => {
  const { [id]: deletedBoard, ...rest } = state;

  return { ...rest };
};

const addWidget = (state, { payload }) => {
  const { id, boardId } = payload;
  const board = state[boardId];
  const { widgets } = board;

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
  const { widgets } = board;

  return {
    ...state,
    [boardId]: {
      ...board,
      widgets: widgets.filter(widgetId => widgetId !== id)
    }
  };
};

const sortWidgets = (state, { payload }) => {
  const { sourceId, targetIndex, boardId } = payload;
  const board = state[boardId];
  const { widgets } = board;
  const sortedWidgets = reorderItems(widgets, sourceId, targetIndex);

  return {
    ...state,
    [boardId]: {
      ...board,
      widgets: sortedWidgets
    }
  };
};

const boardsById = (state = {}, action) => {
  const { type } = action;

  switch (type) {
    case RECEIVE_DATA:
      return receiveData(state, action);
    case INIT_BOARD_PROPS:
      return initBoardProps(state, action);
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
    case SORT_WIDGETS:
      return sortWidgets(state, action);
    default:
      return state;
  }
};

export default boardsById;
