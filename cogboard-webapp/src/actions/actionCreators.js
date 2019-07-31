import { REQUEST_DATA, RECEIVE_DATA, UPDATE_WIDGET, EDIT_WIDGET, ADD_WIDGET, DELETE_WIDGET } from './types';

const requestData = () => ({
  type: REQUEST_DATA
});

const receiveData = state => ({
  type: RECEIVE_DATA,
  payload: state
});

export const fetchData = () =>
  (dispatch) => {
    dispatch(requestData());

    return fetch('/data.json')
      .then(
        response => response.json(),
        error => console.error(error)
      )
      .then(state => dispatch(receiveData(state)));
  };

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