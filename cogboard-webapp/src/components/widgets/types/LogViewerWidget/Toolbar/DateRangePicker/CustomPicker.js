import React from 'react';

import { DateTimePicker } from '@material-ui/pickers';
import CloseIcon from '@material-ui/icons/Close';
import { PickerWrapper, StyledIconButton } from './styled';

const CustomPicker = ({ value, onChange, ...props }) => {
  const handleChange = data => onChange(data?.seconds(0).milliseconds(0));
  return (
    <PickerWrapper>
      <DateTimePicker value={value} onChange={handleChange} {...props} />
      {value && (
        <StyledIconButton onClick={() => onChange(null)}>
          <CloseIcon />
        </StyledIconButton>
      )}
    </PickerWrapper>
  );
};

export default CustomPicker;
