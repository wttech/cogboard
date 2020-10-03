import styled from '@emotion/styled/macro';
import NumberInput from './NumberInput';
import { COLORS } from '../../../constants';
import { Box, Input, Fab, List, FormControl } from '@material-ui/core';

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

  .MuiListItemText-root span {
    max-width: 250px;
    padding-right: 60px;
  }
`;

export const StyledFormControl = styled(FormControl)`
  .MuiInput-root.Mui-error {
    color: ${COLORS.WHITE};
  }
`;

export const StyledFabGroup = styled.div`
  display: flex;
  flex-wrap: wrap;

  button:first-of-type {
    flex: 1;
    width: 40%;
  }

  .clearButton {
    width: 55%;
    margin-left: 16px;
  }
`;

export const StyledRangeSliderForm = styled.div`
  .MuiSlider-root {
    color: white;
  }

  .MuiSlider-valueLabel {
    top: -28px;

    > span {
      width: 28px;
      height: 28px;

      > span {
        color: black
      }
    }
  }

  .MuiSlider-markLabel {
    font-size: 0.75rem;
  }

  .MuiTypography-root {
    color: rgba(255, 255, 255, 0.7);
  }
`;
