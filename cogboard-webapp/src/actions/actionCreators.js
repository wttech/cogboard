import { v4 } from 'uuid';
import {
  REQUEST_DATA,
  RECEIVE_DATA,
  REQUEST_UPDATE,
  ADD_BOARD,
  EDIT_BOARD,
  DELETE_BOARD,
  SET_CURRENT_BOARD,
  UPDATE_WIDGET,
  EDIT_WIDGET,
  ADD_WIDGET,
  DELETE_WIDGET,
  DELETE_MULTIPLE_WIDGETS,
  SORT_WIDGETS,
  REORDER_BOARDS,
  DATA_CHANGED,
  SAVE_DATA_START,
  SAVE_DATA_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  CLEAR_LOGIN_ERROR_MESSAGE,
  LOGOUT,
  INIT_BOARD_PROPS,
  PUSH_NOTIFICATION,
  DELETE_NOTIFICATION,
  SET_LOGOUT_REASON_MESSAGE,
  SAVE_SETTINGS
} from './types';
import { INITIAL_BOARD_PROPS } from '../constants';

export const requestData = () => ({
  type: REQUEST_DATA
});

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS
});

export const loginFailure = data => ({
  type: LOGIN_FAILURE,
  payload: data
});

export const clearLoginErrorMessage = () => ({
  type: CLEAR_LOGIN_ERROR_MESSAGE
});

export const logout = () => ({
  type: LOGOUT
});

export const receiveData = state => ({
  type: RECEIVE_DATA,
  payload: state
});

export const requestUpdate = id => ({
  type: REQUEST_UPDATE,
  payload: id
});

export const updateWidget = data => ({
  type: UPDATE_WIDGET,
  payload: data
});

export const addBoard = data => ({
  type: ADD_BOARD,
  payload: {
    id: `board-${v4()}`,
    theme: 'default',
    widgets: [],
    ...data
  }
});

export const deleteBoard = id => ({
  type: DELETE_BOARD,
  payload: id
});

export const editBoard = editData => ({
  type: EDIT_BOARD,
  payload: editData
});

export const reorderBoards = (sourceId, targetIndex) => ({
  type: REORDER_BOARDS,
  payload: { sourceId, targetIndex }
});

export const editWidget = editData => ({
  type: EDIT_WIDGET,
  payload: editData
});

export const addWidget = widgetData => ({
  type: ADD_WIDGET,
  payload: widgetData
});

export const deleteWidget = (id, boardId) => ({
  type: DELETE_WIDGET,
  payload: { id, boardId }
});

export const deleteMultipleWidgets = (widgetIds, boardId = '') => ({
  type: DELETE_MULTIPLE_WIDGETS,
  payload: { widgetIds, boardId }
});

export const sortWidgets = payload => ({
  type: SORT_WIDGETS,
  payload
});

export const dataChanged = () => ({
  type: DATA_CHANGED
});

export const saveDataStart = () => ({
  type: SAVE_DATA_START
});

export const saveDataSuccess = () => ({
  type: SAVE_DATA_SUCCESS
});

export const setCurrentBoard = id => ({
  type: SET_CURRENT_BOARD,
  payload: id
});

export const initBoardProps = () => ({
  type: INIT_BOARD_PROPS,
  payload: { ...INITIAL_BOARD_PROPS }
});

export const pushNotification = notification => ({
  type: PUSH_NOTIFICATION,
  payload: {
    id: v4(),
    ...notification
  }
});

export const deleteNotification = id => ({
  type: DELETE_NOTIFICATION,
  payload: id
});

export const setLogoutReasonMessage = reason => ({
  type: SET_LOGOUT_REASON_MESSAGE,
  payload: reason
});

export const saveSettings = data => ({
  type: SAVE_SETTINGS,
  payload: data
});
