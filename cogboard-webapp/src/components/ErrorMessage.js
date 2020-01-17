import React from 'react';

import { Typography } from '@material-ui/core';
import StatusIcon from './StatusIcon';
import { StyledIconWrapper } from './Widget/styled';

export const ErrorMessage = ({ errorMessage, errorCause, status }) => {
  return (
    <>
      <StyledIconWrapper>
        <StatusIcon status={status} size="large" />
      </StyledIconWrapper>
      <Typography variant="caption" paragraph>
        {errorMessage}
      </Typography>
    </>
  );
};

export default ErrorMessage;
