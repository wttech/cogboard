import React from 'react';
import { string } from 'prop-types';

import { MenuItem } from '@material-ui/core';
import DropdownField from '../../DropdownField';
import AddEndpoint from '../../AddEndpoint';

const EndpointInput = props => {
  return (
    <DropdownField
      optionalButton={<AddEndpoint/>}
      {...props}>
      {endpoints => endpoints.map(({ id, label }) =>
        <MenuItem key={id} value={id}>{label}</MenuItem>
      )}
    </DropdownField>
  );
};

EndpointInput.propTypes = {
  value: string.isRequired
};

export default EndpointInput;
