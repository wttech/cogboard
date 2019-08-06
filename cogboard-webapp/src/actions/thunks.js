import { requestData, receiveData, requestUpdate, updateWidget, addWidget, editWidget } from './actionCreators';

const checkResponseStatus = response => {
  const { status, statusText } = response;

  if (status >= 200 && status < 300) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(statusText));
  }
};

const fetchData = (url, method = 'GET', data = {}) => {
  const postConfig = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const init = method !== 'GET' ? postConfig : {};

  return fetch(url, init)
    .then(checkResponseStatus)
    .then(response => response.json());
};

export const fetchInitialData = () =>
  (dispatch) => {
    dispatch(requestData());

    return fetchData('/api/config')
      .then(
        data => dispatch(receiveData(data)),
        console.error
      );
  };

const mapDataToState = (data) => {
  const {
    id,
    title,
    type,
    status,
    config,
    boardId,
    ...other
  } = data;

  return {
    generalData: { id, boardId, title, config, type, status },
    serverData: { id, type, ...other }
  };
}

const makeWidgetUpdaterThunk = beforeUpdateActionCreator => data => {
  const { id } = data;
  const { generalData, serverData } = mapDataToState(data);

  return (dispatch) => {
    dispatch(beforeUpdateActionCreator(generalData));
    dispatch(requestUpdate(id));

    return fetchData('/api/widget/update', 'POST', serverData)
      .then(
        () => dispatch(updateWidget(serverData)),
        console.error
      );
  };
};

export const addNewWidget = makeWidgetUpdaterThunk(addWidget);

export const saveWidget = makeWidgetUpdaterThunk(editWidget);