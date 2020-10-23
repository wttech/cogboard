import styled from '@emotion/styled/macro';

import { Typography } from '@material-ui/core';

export const StyledTypography = styled(Typography)`
  display: flex;
  flex: 1;
  align-items: flex-end;
  justify-content: ${({ invalid }) => invalid ? 'center' : 'flex-start'};
`;
