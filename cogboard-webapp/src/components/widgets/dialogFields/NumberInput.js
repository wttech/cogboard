import React from 'react';

import TextField from '@material-ui/core/TextField';
import { StyledValidationMessages } from '../../WidgetForm/styled';
import { hasError } from '../../../helpers';

const NumberInput = ({ min, step, error, dataCy, ...other }) => {
  return (
    <TextField
      type="number"
      inputProps={{ min, step, 'data-cy': dataCy }}
      InputLabelProps={{
        shrink: true
      }}
      margin="normal"
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
