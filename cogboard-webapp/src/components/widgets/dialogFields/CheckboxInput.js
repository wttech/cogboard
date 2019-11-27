import React from 'react';

import { Checkbox, FormControlLabel } from '@material-ui/core';

const CheckboxInput = ({ value, onChange, dataCy, ...other }) => (
  <FormControlLabel
    control={<Checkbox checked={value} onChange={onChange} data-cy={dataCy} />}
    {...other}
  />
);

export default CheckboxInput;
