import React from 'react';

import ErrorPage from './ErrorPage';

const ServerErrorPage = (props) => (
  <ErrorPage
    title='Intermal Server Error'
    tip="Ooops... Something gone wrong. For more details check server's logs."
  />
)

export default ServerErrorPage;