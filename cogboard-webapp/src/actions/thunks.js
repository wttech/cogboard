import {
  requestData,
  receiveData,
  requestUpdate,
  addBoard,
  editBoard,
  deleteBoard,
  setCurrentBoard,
  updateWidget,
  addWidget,
  editWidget,
  deleteMultipleWidgets,
  sortWidgets,
  dataChanged,
  saveDataStart,
  deleteWidget,
  setJwToken,
  loginError
} from './actionCreators';
import {
  fetchData,
  createNewWidgetData,
  createEditWidgetData,
  mapDataToState,
  withDataChanged
} from './helpers';
import { URL } from '../constants';

export const fetchInitialData = () =>
  (dispatch) => {
    dispatch(requestData());

    return fetchData(URL.LOAD_DATA)
      .then(
        data => dispatch(receiveData(data)),
        console.error
      );
  };

export const saveData = () =>
  (dispatch, getState) => {
    const { boards, widgets, app } = getState();
    const data = { boards, widgets };

    return fetchData(URL.SAVE_DATA, 'POST', data, app.jwToken)
      .then(
        () => dispatch(saveDataStart()),
        console.error
      );
  };

export const login = (data) =>
  (dispatch) => {
    return fetchData(URL.LOGIN, 'POST', data)
      .then(
        (data) => dispatch(setJwToken(data.token)),
        (data) => dispatch(loginError(data.message))
      );
  };

export const logout = () =>
  (dispatch) => {
    dispatch(setJwToken(''));
    dispatch(loginError(''));
  };

const deleteBoardWithWidgetsThunk = (id) =>
  (dispatch, getState) => {
    const { ui, boards } = getState();
    const { widgets } = boards.boardsById[id];
    const { currentBoard } = ui;

    dispatch(deleteBoard(id));

    const [firstBoardId] = getState().boards.allBoards;

    (id === currentBoard) && dispatch(setCurrentBoard(firstBoardId || null));
    dispatch(deleteMultipleWidgets(widgets));
  };

const makeWidgetUpdaterThunk = (beforeUpdateActionCreator, widgetDataCreator) => data =>
  (dispatch, getState) => {
    const allWidgets = getState().widgets.allWidgets;
    const token = getState().app.jwToken;
    const widgetData = widgetDataCreator({...data, allWidgets});
    const { id } = widgetData;
    const { generalData, serverData } = mapDataToState(widgetData);

    dispatch(beforeUpdateActionCreator(generalData));
    dispatch(dataChanged());
    dispatch(requestUpdate(id));

    return fetchData(URL.UPDATE_WIDGET, 'POST', serverData, token)
      .then(
        () => dispatch(updateWidget(serverData)),
        console.error
      );
  };

const removeWidgetThunk = (id) =>
  (dispatch, getState) => {
    const { currentBoard: boardId } = getState().ui;

    dispatch(deleteWidget(id, boardId));
  };

export const reorderWidgets = (sourceId, targetIndex) =>
  (dispatch, getState) => {
    const { currentBoard: boardId } = getState().ui;

    dispatch(sortWidgets({ sourceId, targetIndex, boardId }));
  };

export const addNewWidget = makeWidgetUpdaterThunk(addWidget, createNewWidgetData);
export const saveWidget = makeWidgetUpdaterThunk(editWidget, createEditWidgetData);
export const removeWidget = withDataChanged(removeWidgetThunk);
export const addNewBoard = withDataChanged(addBoard);
export const saveBoard = withDataChanged(editBoard);
export const deleteBoardWithWidgets = withDataChanged(deleteBoardWithWidgetsThunk);
export const setWidgetState = withDataChanged(editWidget);