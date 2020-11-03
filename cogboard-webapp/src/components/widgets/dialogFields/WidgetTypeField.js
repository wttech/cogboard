import React from 'react';
import { useSelector } from 'react-redux';

import { MenuItem } from '@material-ui/core';

import { StyledFormControlForDropdown } from '../../styled';
import DropdownField from '../../DropdownField';

const WidgetTypeField = props => {
  const types = useSelector(({ widgets }) => widgets.widgetTypes);

  return (
    <StyledFormControlForDropdown>
      <DropdownField {...props} dropdownItems={types}>
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

export default WidgetTypeField;
