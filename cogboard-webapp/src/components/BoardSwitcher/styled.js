import styled from '@emotion/styled/macro';

import { getColor } from '../../helpers';

import { Typography } from '@material-ui/core';

export const StyledTimer = styled(Typography)`
  margin-right: 20px;
  color: ${getColor('primary')};
`;
