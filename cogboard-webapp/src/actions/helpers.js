import { dataChanged } from './actionCreators';

const checkResponseStatus = response => {
  const { status, statusText } = response;

  if (status >= 200 && status < 300) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(statusText));
  }
};

export const fetchData = (url, method = 'GET', data = {}) => {
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

const makeIdCreator = (prefix) => (allIds) => {
  const intRegex = new RegExp(/[0-9]\d*$/, 'g');
  const [lastId] = [...allIds].sort((a, b) => Number(b.match(intRegex)) - Number(a.match(intRegex)));

  if (lastId) {
    const intId = Number(lastId.match(intRegex));

    return lastId.replace(intRegex, intId + 1);
  } else {
    return `${prefix}1`;
  }
};

const createWidgetId = makeIdCreator('widget');

const mapFormValuesToWidgetData = values => {
  const { columns, goNewLine, ...other } = values;
  return {
    ...other,
    config: {
      columns,
      goNewLine
    }
  };
};

export const createNewWidgetData = ({ values, allWidgets, currentBoardId }) => ({
  boardId: currentBoardId,
  id: createWidgetId(allWidgets),
  status: 'UNKNOWN',
  ...mapFormValuesToWidgetData(values)
});

export const createEditWidgetData = ({ id, values }) => ({ id, ...mapFormValuesToWidgetData(values) });

export const mapDataToState = (data) => {
  const {
    id,
    title,
    content,
    type,
    disabled,
    config,
    ...other
  } = data;

  const newWidgetProps = ['status', 'boardId'];
  const generalData = { id, title, config, type, disabled, content };

  newWidgetProps.forEach(prop => {
    if (data[prop]) {
      generalData[prop] = data[prop];
    }
  });

  return {
    generalData,
    serverData: { id, type, ...other }
  };
};

export const withDataChanged = (actionCallback) => (...args) =>
  dispatch => {
    dispatch(actionCallback.apply(null, args));
    dispatch(dataChanged());
  };