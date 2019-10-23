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
  background: #211f39;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 2000;
  
  > div {
    padding: 0 15px;
    text-align: center;
  }
`;