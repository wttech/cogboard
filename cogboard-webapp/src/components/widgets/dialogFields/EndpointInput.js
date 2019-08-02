import React from 'react';

import { MenuItem } from '@material-ui/core';
import DropdownField from '../../DropdownField';

const EndpointInput = props => {
  return (
    <DropdownField {...props}>
      {endpoints => endpoints.map(({ id, label }) =>
        <MenuItem key={id} value={id}>{label}</MenuItem>
      )}
    </DropdownField>
  );
};

export default EndpointInput;