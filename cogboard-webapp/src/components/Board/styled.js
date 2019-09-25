import styled from '@emotion/styled/macro';
import { getColumns } from './helpers';

export const StyledContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(${getColumns}, 1fr);
  grid-auto-rows: 1fr;
`;