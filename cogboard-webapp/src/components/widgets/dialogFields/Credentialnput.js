import React from 'react';
import { string } from 'prop-types';
import { useSelector } from 'react-redux';

import { getCredentials } from '../../../selectors';

import { MenuItem } from '@material-ui/core';
import DropdownField from '../../DropdownField';
import AddCredential from '../../AddCredential';

const CredentialInput = props => {
  const credentials = useSelector(getCredentials);

  return (
    <DropdownField
      optionalButton={<AddCredential />}
      dropdownItems={credentials}
      {...props}
    >
      {credentials =>
        credentials.map(({ id, label }) => (
          <MenuItem key={id} value={id}>
            {label}
          </MenuItem>
        ))
      }
    </DropdownField>
  );
};

CredentialInput.propTypes = {
  value: string.isRequired
};

export default CredentialInput;
