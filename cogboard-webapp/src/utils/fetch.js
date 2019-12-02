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
