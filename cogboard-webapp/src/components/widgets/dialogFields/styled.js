import styled from '@emotion/styled/macro';
import NumberInput from './NumberInput';
import { Box, Input, Fab, List } from '@material-ui/core';

export const StyledNumberInput = styled(NumberInput)`
  flex-basis: calc(50% - 18px);
`;

export const FlexBoxWrapped = styled(Box)`
  display: flex;
`;

export const StyledInput = styled(Input)`
  margin-top: 16px;
  margin-bottom: 8px;
`;

export const StyledFab = styled(Fab)`
  margin-top: 16px;
  margin-bottom: 8px;
`;

export const StyledList = styled(List)`
  &:empty {
    padding: 0;
  }

  &:not(:empty) {
    margin-top: 16px;
    overflow-y: scroll;
    max-height: 160px;
  }
`;
