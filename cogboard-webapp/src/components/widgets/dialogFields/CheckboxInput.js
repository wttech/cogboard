import React from 'react';

import { Checkbox, FormControlLabel } from '@material-ui/core';
import styled from '@emotion/styled/macro';

export const StyledCheckbox = styled(Checkbox)`
  color: #198cdb;
`;

const CheckboxInput = ({ value, onChange, dataCy, ...other }) => (
  <FormControlLabel
    control={
      <StyledCheckbox
        color="primary"
        checked={value}
        onChange={onChange}
        data-cy={dataCy}
      />
    }
    {...other}
  />
);

export default CheckboxInput;
