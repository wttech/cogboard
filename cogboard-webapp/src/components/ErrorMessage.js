import React from 'react';

import StatusIcon from './StatusIcon';
import { StyledIconWrapper, StyledErrorMessage } from './Widget/styled';

export const ErrorMessage = ({ errorMessage, errorCause, status }) => {
  return (
    <>
      <StyledIconWrapper>
        <StatusIcon status={status} size="large" />
      </StyledIconWrapper>
      <StyledErrorMessage variant="caption" paragraph>
        {errorMessage}
      </StyledErrorMessage>
    </>
  );
};

export default ErrorMessage;
