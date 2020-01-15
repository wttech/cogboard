import React from 'react';
import styled from '@emotion/styled/macro';
import { useTheme } from '@material-ui/styles';

import { Checkbox, FormControlLabel } from '@material-ui/core';

export const StyledCheckbox = styled(Checkbox)`
  color: 'white';
`;

const CheckboxInput = ({ value, onChange, dataCy, ...other }) => {
  const theme = useTheme();

  return (
    <FormControlLabel
      control={
        <StyledCheckbox
          color="secondary"
          checked={value}
          onChange={onChange}
          data-cy={dataCy}
          theme={theme}
        />
      }
      {...other}
    />
  );
};

export default CheckboxInput;
