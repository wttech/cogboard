import styled from '@emotion/styled/macro';
import { Box } from '@material-ui/core';

export const ScrollableBox = styled(Box)`
  overflow-x: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
