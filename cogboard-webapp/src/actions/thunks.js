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
  dataChanged,
  saveDataStart,
  deleteWidget
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
    const { boards, widgets } = getState();
    const data = { boards, widgets };

    return fetchData(URL.SAVE_DATA, 'POST', data)
      .then(
        () => dispatch(saveDataStart()),
        console.error
      );
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
    const widgetData = widgetDataCreator({...data, allWidgets});
    const { id } = widgetData;
    const { generalData, serverData } = mapDataToState(widgetData);

    dispatch(beforeUpdateActionCreator(generalData));
    dispatch(dataChanged());
    dispatch(requestUpdate(id));

    return fetchData(URL.UPDATE_WIDGET, 'POST', serverData)
      .then(
        () => dispatch(updateWidget(serverData)),
        console.error
      );
  };

const removeWidgetThunk = (id) =>
  (dispatch, getState) => {
    const { currentBoard } = getState().ui;

    dispatch(deleteWidget(id, currentBoard));
  };

export const addNewWidget = makeWidgetUpdaterThunk(addWidget, createNewWidgetData);
export const saveWidget = makeWidgetUpdaterThunk(editWidget, createEditWidgetData);
export const removeWidget = withDataChanged(removeWidgetThunk);
export const addNewBoard = withDataChanged(addBoard);
export const saveBoard = withDataChanged(editBoard);
export const deleteBoardWithWidgets = withDataChanged(deleteBoardWithWidgetsThunk);