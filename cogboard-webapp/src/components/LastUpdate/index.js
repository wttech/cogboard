import React from 'react';

import { StyledTypography } from './styled';

const LastUpdate = ({ lastUpdateTime, invalid }) => {
  return (
    <StyledTypography
      invalid={invalid}
      color="textSecondary"
      variant="caption"
      gutterBottom={false}
    >
      {lastUpdateTime}
    </StyledTypography>
  );
};

export default LastUpdate;
