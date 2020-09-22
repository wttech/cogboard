import styled from '@emotion/styled/macro';
import NumberInput from './NumberInput';
import { Box } from '@material-ui/core';
import { Input, List, Fab } from '@material-ui/core';

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
  margin-top: 16px;
  overflow-y: scroll;
  max-height: 160px;
`;

export const StyledFabGroup = styled.div`
  display: flex;
  flex-wrap: wrap;

  button:first-of-type {
    width: 40%;
    margin-right: 16px;
  }

  button:last-of-type {
    width: 55%;
  }
`;
