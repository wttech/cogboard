import React from 'react';

import { StyledTypography } from './styled';

const LastUpdate = ({ lastUpdateTime }) => {
  return (
    <StyledTypography
      align="left"
      color="textSecondary"
      variant="caption"
      gutterBottom={false}
    >
      Last update: {lastUpdateTime}
    </StyledTypography>
  );
};

export default LastUpdate;
