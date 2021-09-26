import styled from '@emotion/styled/macro';
import { Button } from '@material-ui/core';

export const RedButton = styled(Button)`
  color: white;
  background-color: ${({ theme }) => theme.palette.status.FAIL};
`;

export const Wrapper = styled.div`
  top: 0;
  position: absolute;
  overflow-x: hidden;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
  gap: 16px;
`;
