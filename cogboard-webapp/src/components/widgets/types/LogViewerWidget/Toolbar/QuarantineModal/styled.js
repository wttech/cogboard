import styled from '@emotion/styled/macro';

import { COLORS } from '../../../../../../constants';

export const GridSchema = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 0 10px;
`;

export const Container = styled.div`
  max-height: 100%;
  display: grid;
  min-height: 6em;
  grid-template-rows: auto 1fr;
`;
