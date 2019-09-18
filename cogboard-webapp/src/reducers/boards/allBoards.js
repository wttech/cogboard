import { RECEIVE_DATA, DELETE_BOARD, ADD_BOARD, REORDER_BOARDS } from '../../actions/types';

const receiveData = (state, { payload }) => {
  const { boards: { allBoards } } = payload;

  return [...state, ...allBoards];
};

const addBoard = (state, { payload }) => {
  const { id } = payload;

  return [...state, id];
};

const deleteBoard = (state, { payload: id }) =>
  state.filter(boardId => boardId !== id);

const reorderBoards = (state, { payload }) => {
  const { sourceId, targetIndex } = payload;
  const boards = [...state];
  const withoutSource = boards.filter(boardId => boardId !== sourceId);
  const sortedBoards = [
    ...withoutSource.slice(0, targetIndex),
    sourceId,
    ...withoutSource.slice(targetIndex)
  ];

  return sortedBoards
};

const allBoards = (state = [], action) => {
  const { type } = action;

  switch (type) {
    case RECEIVE_DATA:
      return receiveData(state, action);
    case ADD_BOARD:
      return addBoard(state, action);
    case DELETE_BOARD:
      return deleteBoard(state, action);
    case REORDER_BOARDS:
      return reorderBoards(state, action);
    default:
      return state;
  }
};

export default allBoards;