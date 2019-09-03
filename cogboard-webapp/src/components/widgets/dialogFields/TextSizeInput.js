import React from 'react';

import { MenuItem } from '@material-ui/core';
import DropdownField from '../../DropdownField';

const renderTextSize = (textSizes) =>
  Object.entries(textSizes).map(([size, attr]) => (
    <MenuItem key={size} value={attr}>{size}</MenuItem>
  ));

const TextSizeInput = props => {
  return (
      <DropdownField {...props}>
        {renderTextSize}
      </DropdownField>
  );
};

export default TextSizeInput;