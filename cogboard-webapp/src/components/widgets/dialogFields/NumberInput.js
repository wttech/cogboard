import React from 'react';

import TextField from '@material-ui/core/TextField';
import { StyledValidationMessages } from '../../WidgetForm/styled';
import { hasError } from '../../../utils/components';
import { prepareChangeEvent } from './helpers';

const NumberInput = ({ min, step, error, dataCy, onChange, ...other }) => {
  const handleChange = evt => {
    const formattedValue = evt.target.value
      ? parseFloat(evt.target.value.replace(/,/g, ''))
      : '';
    onChange(prepareChangeEvent(parseInt(formattedValue), 'number'));
  };
  return (
    <TextField
      type="number"
      inputProps={{ min, step, 'data-cy': dataCy }}
      InputLabelProps={{
        shrink: true
      }}
      margin="normal"
      onChange={handleChange}
      error={hasError(error)}
      FormHelperTextProps={{ component: 'div' }}
      helperText={
        <StyledValidationMessages
          messages={error}
          data-cy={`${dataCy}-error`}
        />
      }
      {...other}
    />
  );
};

export default NumberInput;
