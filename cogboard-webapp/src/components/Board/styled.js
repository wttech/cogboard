import styled from '@emotion/styled/macro';

import { setSize } from '../helpers';
import { getColumns } from './helpers';

import Typography from '@material-ui/core/Typography';

export const StyledContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(${getColumns}, 1fr);
  grid-auto-rows: 1fr;
`;

export const StyledTitle = styled(Typography)`
  align-self: flex-start;
  margin-bottom: ${setSize(5)};

  &::after {
    background-color: #ff8a65;
    content: '';
    display: block;
    height: 2px;
    margin-top: ${setSize(2)};
    margin-left: 3px;
    width: ${setSize(10)};
  }
`;