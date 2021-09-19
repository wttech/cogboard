import styled from '@emotion/styled/macro';
import { Button } from '@material-ui/core';

export const RedButton = styled(Button)`
  color: white;
  background-color: ${({ theme }) => theme.palette.status.FAIL};
`;

export const ScrollableDiv = styled.div`
  overflow-x: hidden;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: space-between;
  gap: 16px;
  overflow-x: scroll;
`;
