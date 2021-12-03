import styled from '@emotion/styled/macro';
import { IconButton } from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';

export const PickerWrapper = styled.div`
  position: relative;
`;

export const StyledIconButton = styled(IconButton)`
  position: absolute;
  right: 0;
  bottom: 2px;
`;
StyledIconButton.defaultProps = {
  size: 'small',
  variant: 'outlined'
};

export const CustomDateTimePicker = styled(DateTimePicker)`
  width: 10rem;
`;
