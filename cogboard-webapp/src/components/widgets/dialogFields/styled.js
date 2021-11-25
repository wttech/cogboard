import styled from '@emotion/styled/macro';
import NumberInput from './NumberInput';
import IntegerInput from './IntegerInput';
import { COLORS } from '../../../constants';
import { Box, Input, Fab, List, FormControl, Button } from '@material-ui/core';

export const StyledNumberInput = styled(NumberInput)`
  flex-basis: calc(50% - 18px);
`;

export const StyledThresholdInput = styled(IntegerInput)`
  input {
    color: ${({ isWarning }) =>
      isWarning ? `${COLORS.YELLOW}` : `${COLORS.DARK_RED}`};
    &::placeholder {
      opacity: 0.7;
      color: ${({ isWarning }) =>
        isWarning ? `${COLORS.YELLOW}` : `${COLORS.DARK_RED}`};
    }
  }
`;

export const FlexBoxWrapped = styled(Box)`
  display: flex;
`;

export const FlexBoxWrappedSpaced = styled(FlexBoxWrapped)`
  justify-content: space-between;
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
    max-height: 160px;
    overflow-y: auto;
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
    margin-left: 16px;
    width: 55%;
  }
`;

export const StyledRangeSliderForm = styled.div`
  display: flex;
  flex-direction: column;

  .MuiFormControl-root {
    margin-bottom: 12px;
  }

  .MuiSlider-root {
    color: ${COLORS.WHITE};
  }

  .MuiSlider-track {
    background: ${COLORS.ORANGE};
  }

  .MuiSlider-rail {
    opacity: 0.6;

    &::before,
    &::after {
      content: '';
      display: block;
      height: 3px;
      position: absolute;
    }

    &::before {
      background: ${COLORS.GREEN_DEFAULT};
      left: 0;
      width: ${({ startRangeValue }) => `${startRangeValue}%`};
    }

    &::after {
      background: ${COLORS.RED};
      ${({ endRangeValue }) => `
        left: ${endRangeValue}%;
        width: ${100 - endRangeValue}%;
      `}
    }
  }

  .MuiSlider-thumb .MuiSlider-valueLabel {
    top: -28px;
    transform: scale(1) translateY(0);

    > span {
      border-radius: 50% 50% 50% 26%;
      height: 21px;
      width: 21px;

      > span {
        color: ${COLORS.BLACK};
        font-size: 0.65rem;
      }
    }
  }

  .MuiSlider-markLabel {
    font-size: 0.75rem;
  }

  .MuiTypography-root {
    color: rgba(${COLORS.WHITE}, 0.7);
    margin-bottom: 24px;
  }
`;

export const StyledMultiLineWrapper = styled.div`
  display: flex;
  align-items: center;

  .MuiTextField-root {
    flex: 1 0 auto;
  }
`;

export const StyledHorizontalStack = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

export const StyledVerticalStack = styled.div`
  margin: 16px 0 8px 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const StyledLabel = styled.p`
  font-size: 1rem;
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
  transform: translate(0, 1.5px) scale(0.75);
  transform-origin: top left;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0.00938em;
`;

export const DeleteButton = styled(Button)`
  background-color: ${COLORS.RED};

  &:hover {
    background-color: ${COLORS.DARK_RED};
  }
`;
