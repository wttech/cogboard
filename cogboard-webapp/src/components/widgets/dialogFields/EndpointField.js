import React from 'react';

import { MenuItem } from '@material-ui/core';
import DropdownField from '../../DropdownField';

const EndpointField = props => {
  return (
    <DropdownField {...props}>
      {endpoints => endpoints.map(({ id, label }) =>
        <MenuItem key={id} value={id}>{label}</MenuItem>
      )}
    </DropdownField>
  );
};

export default EndpointField;