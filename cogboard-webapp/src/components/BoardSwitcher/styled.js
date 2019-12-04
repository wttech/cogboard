import styled from '@emotion/styled/macro';

import { Typography } from '@material-ui/core';
import { getColor } from '../../utils/components';

export const StyledTimer = styled(Typography)`
  margin-right: 20px;
  color: ${getColor('primary')};
`;
