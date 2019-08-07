import { requestData, receiveData, requestUpdate, updateWidget, addWidget, editWidget } from './actionCreators';
import { fetchData, createNewWidgetData, createEditWidgetData, mapDataToState } from './helpers';

export const fetchInitialData = () =>
  (dispatch) => {
    dispatch(requestData());

    return fetchData('/api/config')
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
        console.log,
        console.error
      );
  };

const makeWidgetUpdaterThunk = (beforeUpdateActionCreator, widgetDataCreator) => data => {
  return (dispatch, getState) => {
    const allWidgets = getState().widgets.allWidgets;
    const widgetData = widgetDataCreator({...data, allWidgets});
    const { id } = widgetData;
    const { generalData, serverData } = mapDataToState(widgetData);

    dispatch(beforeUpdateActionCreator(generalData));
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