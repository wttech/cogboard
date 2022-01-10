import styled from '@emotion/styled/macro';

import { Typography } from '@material-ui/core';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import { COLORS } from '../../../../constants';

export const StyledArrowDown = styled(ArrowDownward)`
  color: ${COLORS.RED};
`;

export const StyledArrowUp = styled(ArrowUpward)`
  color: ${COLORS.GREEN_DEFAULT};
`;

export const StyledMetricName = styled(Typography)`
  font-size: 0.775rem;
  font-weight: 600;
  text-align: center;
`;

export const StyledNumericValue = styled(Typography)`
  margin-bottom: 42px;
  text-align: center;
`;

export const StyledNumericValueWithIcon = styled.div`
  align-items: center;
  display: flex;
  font-size: 16px;
  justify-content: center;
  margin-bottom: 42px;
`;

export const StyledZabbixWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: flex-end;
  margin-bottom: 12px;
`;
