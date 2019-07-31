import React from 'react';

import TextField from '@material-ui/core/TextField';

const ExampleWidgetDialog = ({ handleChange, values }) => {
  const { scheduleDelay = 0 } = values;

  return (
    <TextField
      id="standard-number"
      label="Schedule delay"
      value={scheduleDelay}
      onChange={handleChange('scheduleDelay')}
      type="number"
      inputProps={{
        min: 0,
        step: 500
      }}
      InputLabelProps={{
        shrink: true,
      }}
      margin="normal"
    />
  );
};

export default ExampleWidgetDialog;