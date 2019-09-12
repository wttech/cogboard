import React from 'react';
import styled from '@emotion/styled/macro';
import { Typography } from "@material-ui/core";

const StyledTypography = styled(Typography)`
  display: flex;
  flex: 1;
  align-items: flex-end;
`;

const LastUpdate = ({ lastUpdateTime }) => {
  return (
    <StyledTypography align='left' color='textSecondary' variant='caption' gutterBottom={false}>
      Last update: {lastUpdateTime}
    </StyledTypography>
  );
};

export default LastUpdate;