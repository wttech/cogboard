import React from 'react';

import { StyledValidationMessages } from '../../WidgetForm/styled';
import { hasError } from '../../../utils/components';
import MomentUtils from '@date-io/moment';
import moment from 'moment-timezone';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { prepareChangeEvent } from './helpers';
import CloseIcon from '@material-ui/icons/Close';
import {
  DatePickerWrapper,
  StyledDateTimePicker,
  StyledIconButton
} from './styled';
import { DATE_TIME_FORMAT } from '../../../constants';

const TimestampInput = ({
  error,
  dataCy,
  value,
  label,
  onChange,
  ...other
}) => {
  const handleChange = date =>
    onChange(prepareChangeEvent(date && date.utc().unix(), 'number?'));

  return (
    <DatePickerWrapper>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <StyledDateTimePicker
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
          label={label}
          value={
            Number.isInteger(value)
              ? moment
                  .utc(value * 1000)
                  .local()
                  .format()
              : null
          }
          error={hasError(error)}
          onChange={handleChange}
          format={DATE_TIME_FORMAT}
          ampm={false}
          helperText={
            <StyledValidationMessages
              messages={error}
              data-cy={`${dataCy}-error`}
            />
          }
        />
      </MuiPickersUtilsProvider>
      {Number.isInteger(value) && (
        <StyledIconButton onClick={() => handleChange(null)}>
          <CloseIcon />
        </StyledIconButton>
      )}
    </DatePickerWrapper>
  );
};

export default TimestampInput;
