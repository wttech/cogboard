import React from 'react';

import { FormControlLabel, FormControl, Switch } from '@material-ui/core';

const SwitchInput = ({ label, value, onChange, checkboxValue, dataCy, ...other }) => {
  return (
    <FormControl margin="normal">
      <FormControlLabel
        control={
          <Switch
            checked={value}
            onChange={onChange}
            color="primary"
            value={checkboxValue}
            inputProps={{'data-cy': dataCy}}
            {...other}
          />
        }
        label={label}
      />
    </FormControl>
  )
};

export default SwitchInput;