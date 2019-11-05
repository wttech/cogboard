import {
  RECEIVE_DATA,
  REQUEST_UPDATE,
  UPDATE_WIDGET,
  EDIT_WIDGET,
  ADD_WIDGET,
  DELETE_WIDGET
} from '../../actions/types';

const requestUpdate = (state, { payload: id }) => {
  const widget = state[id];

  return {
    ...state,
    [id]: { ...widget, isUpdating: true }
  };
};

const receiveData = (state, action) => {
  const { payload } = action;
  const {
    widgets: { widgetsById }
  } = payload;

  return { ...state, ...widgetsById };
};

const updateWidget = (state, { payload }) => {
  const { id, content, ...other } = payload;
  const widget = state[id];
  const prevContent = widget.content;

  return {
    ...state,
    [id]: {
      ...widget,
      ...other,
      content: { ...prevContent, ...content },
      isUpdating: false
    }
  };
};

const editWidget = (state, { payload }) => {
  const { id, content, ...other } = payload;
  const widget = state[id];
  const prevContent = widget.content;

  return {
    ...state,
    [id]: {
      ...widget,
      ...other,
      content: { ...prevContent, ...content }
    }
  };
};

const addWidget = (state, { payload }) => {
  const { id, boardId, ...other } = payload;

  return {
    ...state,
    [id]: { id, ...other }
  };
};

const deleteWidget = (state, { payload }) => {
  const { id } = payload;
  const { [id]: widgetId, ...rest } = state;

  return rest;
};

const widgetsById = (state = {}, action) => {
  const { type } = action;

  switch (type) {
    case REQUEST_UPDATE:
      return requestUpdate(state, action);
    case RECEIVE_DATA:
      return receiveData(state, action);
    case UPDATE_WIDGET:
      return updateWidget(state, action);
    case EDIT_WIDGET:
      return editWidget(state, action);
    case ADD_WIDGET:
      return addWidget(state, action);
    case DELETE_WIDGET:
      return deleteWidget(state, action);
    default:
      return state;
  }
};

export default widgetsById;
