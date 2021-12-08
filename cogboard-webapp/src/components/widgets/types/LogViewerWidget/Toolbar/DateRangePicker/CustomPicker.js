import React from 'react';

import CloseIcon from '@material-ui/icons/Close';
import {
  PickerWrapper,
  StyledIconButton,
  CustomDateTimePicker
} from './styled';

const CustomPicker = ({ value, onChange, ...props }) => {
  const handleChange = data => onChange(data?.seconds(0).milliseconds(0));
  return (
    <PickerWrapper>
      <CustomDateTimePicker
        value={value}
        onChange={handleChange}
        format="YYYY-MM-DD HH:mm"
        ampm={false}
        openTo="hours"
        {...props}
      />
      {value && (
        <StyledIconButton onClick={() => onChange(null)}>
          <CloseIcon />
        </StyledIconButton>
      )}
    </PickerWrapper>
  );
};

export default CustomPicker;
