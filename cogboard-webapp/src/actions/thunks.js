import {
  requestData,
  receiveData,
  requestUpdate,
  deleteBoard,
  setCurrentBoard,
  updateWidget,
  addWidget,
  editWidget,
  deleteMultipleWidgets,
  dataChanged,
  saveDataStart
} from './actionCreators';
import {
  fetchData,
  createNewWidgetData,
  createEditWidgetData,
  mapDataToState
} from './helpers';

export const fetchInitialData = () =>
  (dispatch) => {
    dispatch(requestData());

    return fetchData('/data.json')
      .then(
        data => dispatch(receiveData(data)),
        console.error
      );
  };

export const saveData = () =>
  (dispatch, getState) => {
    const { boards, widgets } = getState();
    const data = { boards, widgets };

    return fetchData('/api/config/save', 'POST', data)
      .then(
        () => dispatch(saveDataStart()),
        console.error
      );
  };

export const deleteBoardWithWidgets = (id) =>
  (dispatch, getState) => {
    const { ui, boards } = getState();
    const { widgets } = boards.boardsById[id];
    const { currentBoard } = ui;

    dispatch(deleteBoard(id));

    const [firstBoardId] = getState().boards.allBoards;

    (id === currentBoard) && dispatch(setCurrentBoard(firstBoardId || null));
    dispatch(deleteMultipleWidgets(widgets));
  };

const makeWidgetUpdaterThunk = (beforeUpdateActionCreator, widgetDataCreator) => data => {
  return (dispatch, getState) => {
    const allWidgets = getState().widgets.allWidgets;
    const widgetData = widgetDataCreator({...data, allWidgets});
    const { id } = widgetData;
    const { generalData, serverData } = mapDataToState(widgetData);

    dispatch(beforeUpdateActionCreator(generalData));
    dispatch(dataChanged());
    dispatch(requestUpdate(id));

    return fetchData('/api/widget/update', 'POST', serverData)
      .then(
        () => dispatch(updateWidget(serverData)),
        console.error
      );
  };
};

export const addNewWidget = makeWidgetUpdaterThunk(addWidget, createNewWidgetData);

export const saveWidget = makeWidgetUpdaterThunk(editWidget, createEditWidgetData);