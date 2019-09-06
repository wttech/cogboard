import React from 'react';

import {Checkbox, FormControlLabel} from "@material-ui/core";

const CheckboxInput = ({ value, onChange,  ...other }) => (
  <FormControlLabel
    control={
      <Checkbox
          checked={value}
          onChange={onChange}
      />
    }
    {...other}
  />
);

export default CheckboxInput;