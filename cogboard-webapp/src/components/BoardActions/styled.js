import styled from '@emotion/styled/macro';

import { Box, Fab } from '@material-ui/core';

export const StyledActions = styled(Box)`
  bottom: 50px;
  position: fixed;
  right: 50px;
  z-index: 10000;
`;

export const StyledActionButton = styled(Fab)`
  :not(:last-of-type) {
    margin-right: 16px;
  }
`;
