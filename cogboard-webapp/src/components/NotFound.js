import React from 'react';

import ErrorPage from './ErrorPage';

const NotFound = ({ className }) => (
  <ErrorPage
    title="Page not found"
    tip="Maybe you forget to save a new board?"
    homeLink
    className={className}
  />
);

export default NotFound;
