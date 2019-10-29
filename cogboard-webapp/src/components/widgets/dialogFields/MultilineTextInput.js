import React from 'react';

import TextField from '@material-ui/core/TextField';
import { StyledValidationMessages } from '../../WidgetForm/styled';

const MultilineTextInput = ({ error, ...other }) => {
  return (
    <TextField
      InputLabelProps={{
        shrink: true,
      }}
      margin="normal"
      multiline={true}
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

export default MultilineTextInput;