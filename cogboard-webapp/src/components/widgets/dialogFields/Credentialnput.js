import React from 'react';
import { string } from 'prop-types';

import { MenuItem } from '@material-ui/core';
import DropdownField from '../../DropdownField';
import AddCredential from '../../AddCredential';

const CredentialInput = props => {
  return (
    <DropdownField
      optionalButton={(values, handleDataChange) => (
        <AddCredential
          credentialsData={values}
          dataChanged={handleDataChange}
        />
      )}
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
