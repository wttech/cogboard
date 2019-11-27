import React from 'react';

import TextField from '@material-ui/core/TextField';

const MultilineTextInput = props => {
  return (
    <TextField
      InputLabelProps={{
        shrink: true
      }}
      margin="normal"
      multiline={true}
      {...props}
    />
  );
};

export default MultilineTextInput;
