import { navigate } from '@reach/router';

import {
  requestData,
  receiveData,
  requestUpdate,
  addBoard,
  editBoard,
  deleteBoard,
  reorderBoards,
  setCurrentBoard,
  updateWidget,
  addWidget,
  editWidget,
  deleteMultipleWidgets,
  sortWidgets,
  dataChanged,
  saveDataStart,
  deleteWidget,
  loginSuccess,
  loginFailure,
  logout as logoutUser,
  initBoardProps,
  pushNotification
} from './actionCreators';
import {
  fetchData,
  createNewWidgetData,
  createEditWidgetData,
  mapDataToState,
  withAuthentication,
  withDataChanged
} from './helpers';
import { URL, NOTIFICATIONS } from '../constants';
import { setToken, removeToken, getToken, getUserRole } from '../utils/auth';

export const fetchInitialData = () => dispatch => {
  dispatch(requestData());

  return fetchData(URL.LOAD_DATA).then(data => {
    dispatch(receiveData(data));
    dispatch(initBoardProps());
  }, console.error);
};

export const saveDataThunk = () => (dispatch, getState) => {
  const { boards, widgets } = getState();
  const data = { boards, widgets };
  const token = getToken();

  return fetchData(URL.SAVE_DATA, 'POST', data, token).then(
    () => dispatch(saveDataStart()),
    console.error
  );
};

export const login = credentials => dispatch => {
  return fetchData(URL.LOGIN, 'POST', credentials).then(
    ({ token }) => {
      setToken(token);
      dispatch(loginSuccess());
      dispatch(pushNotification(NOTIFICATIONS.LOGIN(getUserRole())));
    },
    ({ message }) => dispatch(loginFailure(message))
  );
};

export const logout = () => (dispatch, getState) => {
  const userRole = getUserRole();
  const {
    app: { logoutReasonMessage }
  } = getState();

  removeToken();

  dispatch(logoutUser());
  dispatch(
    pushNotification(NOTIFICATIONS.LOGOUT(userRole, logoutReasonMessage))
  );
};

const deleteBoardWithWidgetsThunk = id => (dispatch, getState) => {
  const { ui, boards } = getState();
  const { widgets } = boards.boardsById[id];
  const { currentBoard } = ui;

  dispatch(deleteBoard(id));

  const [firstBoardId] = getState().boards.allBoards;

  if (id === currentBoard) {
    dispatch(setCurrentBoard(firstBoardId || null));
    navigate(firstBoardId || '/');
  }

  dispatch(deleteMultipleWidgets(widgets));
};

const makeWidgetUpdaterThunk = (
  beforeUpdateActionCreator,
  widgetDataCreator
) => data => (dispatch, getState) => {
  const allWidgets = getState().widgets.allWidgets;
  const token = getToken();
  const widgetData = widgetDataCreator({ ...data, allWidgets });
  const { id } = widgetData;
  const { generalData, serverData } = mapDataToState(widgetData);

  dispatch(beforeUpdateActionCreator(generalData));
  dispatch(dataChanged());
  dispatch(requestUpdate(id));

  return fetchData(URL.UPDATE_WIDGET, 'POST', serverData, token).then(
    () => dispatch(updateWidget(serverData)),
    console.error
  );
};

const removeWidgetThunk = id => (dispatch, getState) => {
  const { currentBoard: boardId } = getState().ui;
  const token = getToken();

  return fetchData(URL.DELETE_WIDGET, 'POST', { id }, token).then(
    () => dispatch(deleteWidget(id, boardId)),
    console.error
  );
};

const reorderWidgetsThunk = (sourceId, targetIndex) => (dispatch, getState) => {
  const { currentBoard: boardId } = getState().ui;

  dispatch(sortWidgets({ sourceId, targetIndex, boardId }));
};

export const addNewWidget = withAuthentication(
  makeWidgetUpdaterThunk(addWidget, createNewWidgetData)
);
export const saveWidget = withAuthentication(
  makeWidgetUpdaterThunk(editWidget, createEditWidgetData)
);
export const removeWidget = withAuthentication(
  withDataChanged(removeWidgetThunk)
);
export const reorderWidgets = withDataChanged(reorderWidgetsThunk);
export const reorderBoard = withDataChanged(reorderBoards);
export const addNewBoard = withDataChanged(addBoard);
export const saveBoard = withDataChanged(editBoard);
export const deleteBoardWithWidgets = withDataChanged(
  deleteBoardWithWidgetsThunk
);
export const setWidgetState = withDataChanged(editWidget);
export const saveData = withAuthentication(saveDataThunk);
