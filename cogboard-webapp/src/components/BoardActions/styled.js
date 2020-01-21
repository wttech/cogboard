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

export const StyledSaveActionButton = styled(StyledActionButton)`
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% {
      opacity: 0.7;
      box-shadow: 0 0 0 0 rgba(28, 38, 48, 0.4);
    }
    70% {
      opacity: 1;
      box-shadow: 0 0 0 10px rgba(28, 38, 48, 0);
    }
    100% {
      opacity: 0.7;
      box-shadow: 0 0 0 0 rgba(28, 38, 48, 0);
    }
  }
`;
