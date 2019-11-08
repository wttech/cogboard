import { SET_CURRENT_BOARD } from '../../actions/types';

const currentBoard = (state = null, action) => {
  const { type, payload: boardId } = action;

  switch (type) {
    case SET_CURRENT_BOARD:
      return boardId;
    default:
      return state;
  }
};

export default currentBoard;
