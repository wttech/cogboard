import React from 'react';

import {FormControl, MenuItem} from '@material-ui/core';
import DropdownField from '../../DropdownField';
import styled from "@emotion/styled/macro";

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

    const StyledDropdown = styled(FormControl)`
      display: flex;
      margin-bottom: 12px;
      min-width: 300px;
    `;

    return (
        <StyledDropdown>
            <DropdownField {...props}>
                {items => items.map(item=>
                    <MenuItem key={item.value} value={item.value}>{item.display}</MenuItem>
                )}
            </DropdownField>
        </StyledDropdown>
    );
};

export default DisplayValueSelect;