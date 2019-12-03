import { navigate } from '@reach/router';

export const checkResponseStatus = response => {
  const { status, statusText } = response;

  if (status >= 200 && status < 300) {
    return Promise.resolve(response);
  } else if (status >= 500) {
    navigate('/error-page');
    return Promise.reject(new Error(statusText));
  } else {
    return Promise.reject(new Error(statusText));
  }
};

export const postWidgetContentUpdate = (data = {}) => {
  const postConfig = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  return fetch('/api/widget/contentUpdate', postConfig)
    .then(checkResponseStatus)
    .then(response => response.json());
};
