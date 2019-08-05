import React from 'react';
import styled from '@emotion/styled/macro';

import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';

const StyledButton = styled(Button)`
  width: 100%
`;

const JenkinsJobWidget = props => {
  const { duration, displayName = '#', url = '#', timestamp = '-', builtOn = '-' } = props;
  const ts = timestamp ? new Date(timestamp).toLocaleString() : '';
  const dur = duration ? `${duration / 1000} [s]` : '';

  return (
    <>
      <Typography
        variant="caption">
        <p>Timestamp: {ts}</p>
        <p>Duration: {dur}</p>
        <p>Executor: {builtOn}</p>
      </Typography>
      <StyledButton
        variant="outlined"
        href={url}>
        {displayName}
      </StyledButton>
    </>
  );
};

export default JenkinsJobWidget;