import React from 'react';
import { string } from 'prop-types';
import { useSelector } from 'react-redux';

import { getEndpoints } from '../../../selectors';

import { MenuItem } from '@material-ui/core';
import DropdownField from '../../DropdownField';
import AddEndpoint from '../../AddEndpoint';

const EndpointInput = props => {
  const endpoints = useSelector(getEndpoints);
  const noValue = { id: '', label: '', user: ''};
  const extendedEndpoints = [noValue, ...endpoints];

  return (
    <DropdownField
      optionalButton={<AddEndpoint />}
      dropdownItems={extendedEndpoints}
      {...props}
    >
      {endpoints =>
        endpoints.map(({ id, label }) => (
          <MenuItem key={id} value={id}>
            {label}
          </MenuItem>
        ))
      }
    </DropdownField>
  );
};

EndpointInput.propTypes = {
  value: string.isRequired
};

export default EndpointInput;
