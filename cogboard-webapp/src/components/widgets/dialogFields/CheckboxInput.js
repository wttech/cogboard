import React from 'react';

import {Checkbox, FormControlLabel} from "@material-ui/core";

const CheckboxInput = props => {
  const {value} = props;

  return (
      <FormControlLabel
          control={
            <Checkbox
                checked={value}
                {...props}
            />
          }
          {...props}
      />
  );
};

export default CheckboxInput;