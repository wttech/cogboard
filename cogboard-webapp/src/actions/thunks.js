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
  saveDataSuccess,
  deleteWidget,
  loginSuccess,
  loginFailure,
  logout as logoutUser,
  initBoardProps,
  pushNotification,
  saveSettings,
  addSettingsItem,
  editSettingsItem,
  deleteSettingsItem,
  waitingForNewVersion,
  guestLoginSuccess
} from './actionCreators';
import {
  fetchData,
  createNewWidgetData,
  createEditWidgetData,
  mapDataToState,
  withAuthentication,
  withDataChanged,
  checkIfNotificationExist,
  dispatchEvent
} from './helpers';
import { URL, NOTIFICATIONS } from '../constants';
import {
  setToken,
  removeToken,
  getToken,
  getUserRole,
  setGuestName,
  removeGuestName,
  getGuestName
} from '../utils/auth';
import { newVersionButtonsCreator } from '../components/NewVersionButtons/helpers';

export const fetchInitialData = () => dispatch => {
  dispatch(requestData());

  return fetchData(URL.LOAD_DATA).then(data => {
    dispatch(receiveData(data));
    dispatch(initBoardProps());
  }, console.error);
};

export const fetchAppInfo = () => dispatch => {
  return fetchData(URL.LOAD_INFO).then(
    () => dispatch(waitingForNewVersion(true)),
    console.error
  );
};

export const saveDataThunk = () => (dispatch, getState) => {
  const state = getState();
  const { boards } = state;
  const widgets = {
    allWidgets: state.widgets.allWidgets,
    widgetsById: state.widgets.widgetsById
  };
  const data = { boards, widgets };
  const token = getToken();

  return fetchData(URL.SAVE_DATA, { method: 'POST', data, token }).then(
    () => dispatch(saveDataSuccess()),
    console.error
  );
};

export const login = (credentials, loginAsGuest) => dispatch => {
  if (loginAsGuest) {
    const guestName = credentials.username;
    setGuestName(guestName);
    dispatch(guestLoginSuccess(guestName));
    dispatch(pushNotification(NOTIFICATIONS.LOGIN(`Guest: ${guestName}`)));
  } else {
    return fetchData(URL.LOGIN, { method: 'POST', data: credentials }).then(
      ({ token }) => {
        setToken(token);
        dispatch(loginSuccess());
        dispatch(pushNotification(NOTIFICATIONS.LOGIN(getUserRole())));
      },
      ({ message }) => dispatch(loginFailure(message))
    );
  }
};

export const logout = () => (dispatch, getState) => {
  let userRole;
  let message = '';

  if (!!getGuestName()) {
    userRole = `Guest: ${getGuestName()}`;
    removeGuestName();
  } else {
    userRole = getUserRole();
    message = getState().app.logoutReasonMessage;
    removeToken();
  }

  dispatch(logoutUser());
  dispatch(pushNotification(NOTIFICATIONS.LOGOUT(userRole, message)));
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

  return fetchData(URL.UPDATE_WIDGET, {
    method: 'POST',
    data: serverData,
    token
  }).then(() => dispatch(updateWidget(serverData)), console.error);
};

const removeWidgetThunk = id => (dispatch, getState) => {
  const { currentBoard: boardId } = getState().ui;
  const token = getToken();

  return fetchData(URL.DELETE_WIDGET, {
    method: 'POST',
    data: { id },
    token
  }).then(() => dispatch(deleteWidget(id, boardId)), console.error);
};

const reorderWidgetsThunk = (sourceId, targetIndex) => (dispatch, getState) => {
  const { currentBoard: boardId } = getState().ui;

  dispatch(sortWidgets({ sourceId, targetIndex, boardId }));
};

const loadSettingsThunk = () => dispatch => {
  const token = getToken();

  Promise.all(
    [URL.ENDPOINTS_ENDPOINT, URL.CREDENTIALS_ENDPOINT].map(item =>
      fetchData(item, { token })
    )
  )
    .then(([endpoints, credentials]) => {
      dispatch(
        saveSettings({
          endpoints,
          credentials
        })
      );
    })
    .catch(console.log);
};

const settingItemThunk = (
  url,
  method,
  itemName,
  reduxAction,
  data = {}
) => dispatch => {
  const token = getToken();

  return fetchData(url, { method, data, token }).then(
    response => dispatch(reduxAction(itemName, response)),
    console.error
  );
};

const addEndpointThunk = endpoint =>
  settingItemThunk(
    URL.ENDPOINTS_ENDPOINT,
    'POST',
    'endpoints',
    addSettingsItem,
    endpoint
  );

const editEndpointThunk = endpoint =>
  settingItemThunk(
    URL.ENDPOINTS_ENDPOINT,
    'POST',
    'endpoints',
    editSettingsItem,
    endpoint
  );

const deleteEndpointThunk = id =>
  settingItemThunk(
    `${URL.ENDPOINTS_ENDPOINT}/${id}`,
    'DELETE',
    'endpoints',
    deleteSettingsItem
  );

const addCredentialThunk = credential =>
  settingItemThunk(
    URL.CREDENTIALS_ENDPOINT,
    'POST',
    'credentials',
    addSettingsItem,
    credential
  );

const editCredentialThunk = credential =>
  settingItemThunk(
    URL.CREDENTIALS_ENDPOINT,
    'POST',
    'credentials',
    editSettingsItem,
    credential
  );

const deleteCredentialThunk = id =>
  settingItemThunk(
    `${URL.CREDENTIALS_ENDPOINT}/${id}`,
    'DELETE',
    'credentials',
    deleteSettingsItem
  );

const updateUserSettingsThunk = user => dispatch => {
  const token = getToken();
  return fetchData(URL.UPDATE_USER_SETTINGS, {
    method: 'POST',
    data: user,
    token
  }).then(
    ({ message }) => {
      if (message) {
        dispatch(
          pushNotification(NOTIFICATIONS.CHANGE_CREDENTIALS_FAILED(message))
        );
      } else {
        let userRole = getUserRole();
        removeToken();
        dispatch(
          pushNotification(NOTIFICATIONS.CHANGE_CREDENTIALS_SUCCESS(userRole))
        );
        dispatch(logoutUser());
        dispatchEvent('sucessPasswordChange');
      }
    },
    value => console.log(value),
    console.error
  );
};

export const pushNewVersionNotification = ({ content }) => (
  dispatch,
  getState
) => {
  const {
    notifications: { isWaitingForNewVersion, notificationsById }
  } = getState();
  const buttons = newVersionButtonsCreator(content);

  if (isWaitingForNewVersion) {
    if (buttons && !checkIfNotificationExist(notificationsById)) {
      dispatch(pushNotification(NOTIFICATIONS.NEW_VERSION(buttons)));
    }
    dispatch(waitingForNewVersion(false));
  }
};

export const updateWidgetContent = data => (dispatch, getState) => {
  const { id } = data;
  const { widgetsById } = getState().widgets;

  if (id in widgetsById) {
    dispatch(updateWidget(data));
  }
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
export const setToDoListState = withDataChanged(editWidget);
export const saveData = withAuthentication(saveDataThunk);
export const loadSettings = withAuthentication(loadSettingsThunk);
export const addEndpoint = withAuthentication(addEndpointThunk);
export const editEndpoint = withAuthentication(editEndpointThunk);
export const deleteEndpoint = withAuthentication(deleteEndpointThunk);
export const addCredential = withAuthentication(addCredentialThunk);
export const editCredential = withAuthentication(editCredentialThunk);
export const deleteCredential = withAuthentication(deleteCredentialThunk);
export const updateUserSettings = withAuthentication(updateUserSettingsThunk);
