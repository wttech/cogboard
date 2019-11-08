import React from 'react';
import { MenuItem } from '@material-ui/core';

import DropdownField from '../../DropdownField';
import { StyledFormControlForDropdown } from '../../styled';

/**
 * Displays dropdown field using passed array of objects with the following properties: display, value.
 * Example: [
 *  {
 *      display: "name1"
 *      value: "value1"
 *  },
 *  {
 *      display: "name2"
 *      value: "value2"
 *  }
 * ]
 */
const DisplayValueSelect = props => {
  return (
    <StyledFormControlForDropdown>
      <DropdownField {...props}>
        {items =>
          items.map(item => (
            <MenuItem key={item.value} value={item.value}>
              {item.display}
            </MenuItem>
          ))
        }
      </DropdownField>
    </StyledFormControlForDropdown>
  );
};

export default DisplayValueSelect;
