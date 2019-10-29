import React from 'react';

import TextField from '@material-ui/core/TextField';
import { StyledValidationMessages } from '../../WidgetForm/styled';

const NumberInput = ({ min, step, error, ...other }) => {

  return (
    <TextField
      type="number"
      inputProps={{ min, step }}
      InputLabelProps={{
        shrink: true,
      }}
      margin="normal"
      {...other}
      error={error !== undefined}
      FormHelperTextProps={{component: 'div'}}
      helperText={
        <StyledValidationMessages
          messages={error}
          data-cy={'widget-form-rows-error'}
        />}
    />
  );
};

export default NumberInput;