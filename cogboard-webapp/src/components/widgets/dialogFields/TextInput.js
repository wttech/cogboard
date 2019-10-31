import React from 'react';

import TextField from '@material-ui/core/TextField';
import { StyledValidationMessages } from '../../WidgetForm/styled';

const TextInput = ({ error, dataCy, values, ...other }) => {
  console.log(other)
  return (
    <TextField
      InputLabelProps={{
        shrink: true,
      }}
      margin="normal"
      error={error !== undefined}
      FormHelperTextProps={{component: 'div'}}
      helperText={
        <StyledValidationMessages
          messages={error}
          data-cy={`${dataCy}-error`}
        />}
      inputProps={{'data-cy': dataCy}}
      {...other}
    />
  );
};

export default TextInput;