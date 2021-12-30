import React from 'react';

import CloseIcon from '@material-ui/icons/Close';
import {
  PickerWrapper,
  StyledIconButton,
  CustomDateTimePicker
} from './styled';

const CustomPicker = ({ value, onChange, label, ...props }) => {
  const handleChange = data => onChange(data?.seconds(0).milliseconds(0));
  return (
    <PickerWrapper>
      <CustomDateTimePicker
        data-cy={`date-time-picker-${label?.toLowerCase()}`}
        value={value}
        onChange={handleChange}
        format="YYYY-MM-DD HH:mm"
        ampm={false}
        openTo="hours"
        label={label}
        {...props}
      />
      {value && (
        <StyledIconButton
          onClick={() => onChange(null)}
          data-cy={`date-time-picker-${label?.toLowerCase()}-clear`}
        >
          <CloseIcon />
        </StyledIconButton>
      )}
    </PickerWrapper>
  );
};

export default CustomPicker;
