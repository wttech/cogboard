import styled from '@emotion/styled/macro';
import { getColumns } from './helpers';
import NotFound from '../NotFound';

export const StyledContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(${getColumns}, 1fr);
  grid-auto-rows: 1fr;
`;

export const StyledNotFound = styled(NotFound)`
  position: absolute;
  z-index: 2000;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
  background: #211f39;
`;