import { REQUEST_DATA, RECEIVE_DATA, REQUEST_UPDATE, UPDATE_WIDGET, ADD_BOARD, EDIT_BOARD, DELETE_BOARD, EDIT_WIDGET, ADD_WIDGET, DELETE_WIDGET, CHANGE_DATA, SAVE_DATA_SUCCESS, SET_CURRENT_BOARD, DELETE_MULTIPLE_WIDGETS } from './types';
import { v4 } from 'uuid';

export const requestData = () => ({
  type: REQUEST_DATA
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
})

export const deleteWidget = (id, boardId) => ({
  type: DELETE_WIDGET,
  payload: { id, boardId }
});

export const deleteMultipleWidgets = (widgetIds, boardId = '') => ({
  type: DELETE_MULTIPLE_WIDGETS,
  payload: { widgetIds, boardId }
});

export const changeData = () => ({
  type: CHANGE_DATA,
});

export const saveDataSuccess = () => ({
  type: SAVE_DATA_SUCCESS,
});

export const setCurrentBoard = (id) => ({
  type: SET_CURRENT_BOARD,
  payload: id
});