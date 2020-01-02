import React from 'react';

import { Typography } from '@material-ui/core';

export const ErrorMessage = ({ errorMessage, errorCause }) => {
  return (
    <>
      <Typography paragraph>{errorMessage}</Typography>
      <Typography variant="caption" paragraph>
        {errorCause}
      </Typography>
    </>
  );
};

export default ErrorMessage;
