import { createSelector } from 'reselect';

const getBoardsById = ({ boards }) => boards.boardsById;

const getAllBoards = ({ boards }) => boards.allBoards;

const getUi = ({ ui }) => ui;

const getBoardId = (_, boardId) => boardId;

export const getCurrentBoardId = createSelector(
  [getUi],
  ui => ui.currentBoard
);

const getBoard = createSelector(
  [getBoardsById, getBoardId],
  (boardsById, boardId) => boardsById[boardId]
);

export const getBoardTitle = createSelector(
  [getBoard],
  (board) => board && board.title
);

export const getSwitchInterval = createSelector(
  [getBoard],
  (board) => board && board.switchInterval
);

export const getSwitcherBoards = createSelector(
  [getAllBoards, getBoardsById],
  (allBoards, boardsById) => allBoards.filter(boardId => boardsById[boardId].autoSwitch)
);

export const getBoards = createSelector(
  [getBoardsById],
  (allBoards) => Object.values(allBoards)
);