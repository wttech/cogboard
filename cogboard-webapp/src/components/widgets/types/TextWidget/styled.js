import styled from '@emotion/styled/macro';

import { Typography } from '@material-ui/core';

export const VerticalText = styled(Typography)`
  margin-top: auto;
  transform: rotate(-180deg);
  writing-mode: vertical-rl;
`;

export const StyledPre = styled.pre`
  font-family: inherit;
`;