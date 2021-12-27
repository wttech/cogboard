import React from 'react';
import DropdownField from '../../DropdownField';
import { MenuItem } from '@material-ui/core';

const ParserTypeInput = props => {
  const parsers = [{ id: 'mock', label: 'Mock Parser' }];

  return (
    <DropdownField dropdownItems={parsers} {...props}>
      {parsers =>
        parsers.map(({ id, label }) => (
          <MenuItem key={id} value={id}>
            {label}
          </MenuItem>
        ))
      }
    </DropdownField>
  );
};

export default ParserTypeInput;