import React from 'react';

import TextField from '@material-ui/core/TextField';
import { StyledValidationMessages } from '../../WidgetForm/styled';
import { hasError } from '../../../helpers';

const MultilineTextInput = ({ error, dataCy, values, ...other }) => {
  return (
    <TextField
      InputLabelProps={{
        shrink: true
      }}
      margin="normal"
      multiline={true}
      error={hasError(error)}
      FormHelperTextProps={{ component: 'div' }}
      helperText={
        <StyledValidationMessages
          messages={error}
          data-cy={`${dataCy}-error`}
        />
      }
      inputProps={{ 'data-cy': dataCy }}
      {...other}
    />
  );
};

export default MultilineTextInput;
