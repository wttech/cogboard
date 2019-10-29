import { createSelector } from 'reselect';

const getApp = ({ app }) => app;

const getUi = ({ ui }) => ui;

const getBoardsById = ({ boards }) => boards.boardsById;

const getAllBoards = ({ boards }) => boards.allBoards;

const getBoardId = (_, boardId) => boardId;

export const getIsAuthenticated = createSelector(
  [getApp],
  ({ isAuthenticated }) => isAuthenticated
)

export const getCurrentBoardId = createSelector(
  [getUi],
  ({ currentBoard }) => currentBoard
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
  (boardsById) => Object.values(boardsById)
);