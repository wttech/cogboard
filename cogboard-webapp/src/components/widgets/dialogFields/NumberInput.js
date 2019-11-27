import React from 'react';

import TextField from '@material-ui/core/TextField';

const NumberInput = props => {
  const { min, step, ...other } = props;

  return (
    <TextField
      type="number"
      inputProps={{ min, step }}
      InputLabelProps={{
        shrink: true
      }}
      margin="normal"
      {...other}
    />
  );
};

export default NumberInput;
