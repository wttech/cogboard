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
  DATA_CHANGED,
  SAVE_DATA_START,
  SAVE_DATA_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_ERROR
} from './types';

export const requestData = () => ({
  type: REQUEST_DATA
});

export const setJwToken = (jwt) => ({
  type: LOGIN_SUCCESS,
  payload: jwt
});

export const loginError = (data) => ({
  type: LOGIN_ERROR,
  payload: data
});

export const receiveData = state => ({
  type: RECEIVE_DATA,
  payload: state
});

export const requestUpdate = (id) => ({
  type: REQUEST_UPDATE,
  payload: id
});

export const updateWidget = (data) => ({
  type: UPDATE_WIDGET,
  payload: data
});

export const addBoard = (data) => ({
  type: ADD_BOARD,
  payload: {
    id: v4(),
    theme: 'default',
    widgets: [],
    ...data
  }
});

export const deleteBoard = (id) => ({
  type: DELETE_BOARD,
  payload: id
});

export const editBoard = (editData) => ({
  type: EDIT_BOARD,
  payload: editData
});

export const editWidget = (editData) => ({
  type: EDIT_WIDGET,
  payload: editData
});

export const addWidget = (widgetData) => ({
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

export const sortWidgets = (payload) => ({
  type: SORT_WIDGETS,
  payload
});

export const dataChanged = () => ({
  type: DATA_CHANGED,
});

export const saveDataStart = () => ({
  type: SAVE_DATA_START,
});

export const saveDataSuccess = () => ({
  type: SAVE_DATA_SUCCESS,
});

export const setCurrentBoard = (id) => ({
  type: SET_CURRENT_BOARD,
  payload: id
});