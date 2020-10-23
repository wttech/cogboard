import styled from '@emotion/styled/macro';

import { Typography } from '@material-ui/core';

export const StyledMetricName = styled(Typography)`
  font-size: 0.775rem;
  font-weight: 600;
  text-align: center;
`;

export const StyledNumericValue = styled(Typography)`
  margin-bottom: 42px;
  text-align: center;
`;

export const StyledZabbixWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: flex-end;
  margin-bottom: 12px;
`;
