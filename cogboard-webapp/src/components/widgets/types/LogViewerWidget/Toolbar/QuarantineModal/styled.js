import styled from '@emotion/styled/macro';

import { Button } from '@material-ui/core';
import CancelButton from '../../../../../CancelButton';

export const StyledButton = styled(Button)`
  margin-top: 12px;
`;

export const StyledCancelButton = styled(CancelButton)`
  margin-left: 20px;
`;

export const StyledHorizontalContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
