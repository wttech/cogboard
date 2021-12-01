import React from 'react';

import { DateTimePicker } from '@material-ui/pickers';
import CloseIcon from '@material-ui/icons/Close';
import { PickerWrapper, StyledIconButton } from './styled';

const CustomPicker = ({ value, onChange, ...props }) => (
  <PickerWrapper>
    <DateTimePicker value={value} onChange={onChange} {...props} />
    {value && (
      <StyledIconButton onClick={() => onChange(null)}>
        <CloseIcon />
      </StyledIconButton>
    )}
  </PickerWrapper>
);

export default CustomPicker;
