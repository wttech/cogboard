import { requestData, receiveData, requestUpdate, updateWidget, addWidget, editWidget } from './actionCreators';
import { fetchData, createNewWidgetData, createEditWidgetData, mapDataToState } from './helpers';

export const fetchInitialData = () =>
  (dispatch) => {
    dispatch(requestData());

    return fetchData('/data.json')
      .then(
        data => dispatch(receiveData(data)),
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

    return fetchData('https://jsonplaceholder.typicode.com/posts', 'POST', serverData)
      .then(
        () => dispatch(updateWidget(serverData)),
        console.error
      );
  };
};

export const addNewWidget = makeWidgetUpdaterThunk(addWidget, createNewWidgetData);

export const saveWidget = makeWidgetUpdaterThunk(editWidget, createEditWidgetData);