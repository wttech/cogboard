import {
  REQUEST_DATA,
  RECEIVE_DATA,
  REQUEST_UPDATE,
  UPDATE_WIDGET,
  EDIT_WIDGET,
  ADD_WIDGET,
  DELETE_WIDGET,
  DATA_CHANGED,
  SAVE_DATA_START,
  SAVE_DATA_SUCCESS
} from './types';

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

export const dataChanged = () => ({
  type: DATA_CHANGED,
});

export const saveDataStart = () => ({
  type: SAVE_DATA_START,
});

export const saveDataSuccess = () => ({
  type: SAVE_DATA_SUCCESS,
});