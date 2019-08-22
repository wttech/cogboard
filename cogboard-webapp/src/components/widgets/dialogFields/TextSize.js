import React from 'react';
import { string } from 'prop-types';

import { MenuItem } from '@material-ui/core';
import DropdownField from '../../DropdownField';

const SizeMappings = {
  XXL : 'h1',
  XL : 'h2',
  L : 'h3',
  M : 'h4',
  S : 'h5',
  XS : 'h6'
};

const EndpointInput = textSize => {
  return (
    <DropdownField>
        <MenuItem key={SizeMappings[textSize]} value={SizeMappings[textSize]}>{textSize}</MenuItem>
    </DropdownField>
  );
};

EndpointInput.propTypes = {
  textSize: string.isRequired
};

EndpointInput.defaultProps = {
  textSize: 'L'
};

export default EndpointInput;