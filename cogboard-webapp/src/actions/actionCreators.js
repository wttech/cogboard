import { REQUEST_DATA, RECEIVE_DATA, REQUEST_UPDATE, UPDATE_WIDGET, EDIT_WIDGET, ADD_WIDGET, DELETE_WIDGET, CHANGE_DATA, SAVE_DATA_SUCCESS } from './types';

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

export const changeData = () => ({
  type: CHANGE_DATA,
});

export const saveDataSuccess = () => ({
  type: SAVE_DATA_SUCCESS,
});