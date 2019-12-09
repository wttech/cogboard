import { createSelector } from 'reselect';

const getApp = ({ app }) => app;

const getSettings = ({ app: { settings } }) => settings;

const getUi = ({ ui }) => ui;

const getNotifications = ({ notifications }) => notifications;

const getBoardsById = ({ boards }) => boards.boardsById;

const getAllBoards = ({ boards }) => boards.allBoards;

const getBoardId = (_, boardId) => boardId;

const getNotificationId = (_, notificationId) => notificationId;

export const getIsAuthenticated = createSelector(
  [getApp],
  ({ isAuthenticated }) => isAuthenticated
);

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
  board => board && board.title
);

export const getSwitchInterval = createSelector(
  [getBoard],
  board => board && board.switchInterval
);

export const getSwitcherBoards = createSelector(
  [getAllBoards, getBoardsById],
  (allBoards, boardsById) =>
    allBoards.filter(boardId => boardsById[boardId].autoSwitch)
);

export const getNotificationsById = createSelector(
  [getNotifications],
  ({ notificationsById }) => notificationsById
);

export const createGetNotification = () =>
  createSelector(
    [getNotificationsById, getNotificationId],
    (notificationsById, notificationId) => notificationsById[notificationId]
  );

export const getAllNotifications = createSelector(
  [getNotifications],
  ({ allNotifications }) => allNotifications
);

export const getBoards = createSelector(
  [getBoardsById],
  boardsById => Object.values(boardsById)
);

export const getEndpoints = createSelector(
  [getSettings],
  ({ endpoints }) => endpoints
);

export const getCredentials = createSelector(
  [getSettings],
  ({ credentials }) => credentials
);
