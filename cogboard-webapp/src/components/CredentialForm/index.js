import React from 'react';

import { string } from 'prop-types';
import { Button } from '@material-ui/core';
import { StyledCancelButton } from './styled';

const CredentialsForm = ({ onSubmit, handleCancel, ...initialFormValues }) => {

  return (
    <form onSubmit={onSubmit({label: "label"})} noValidate="novalidate">
        <Button
          color="primary"
          variant="contained"
          type="submit"
          data-cy="credentials-form-submit-button"
        >
          Save
        </Button>
        <StyledCancelButton
          handleCancelClick={handleCancel}
          data-cy="credentials-form-cancel-button"
        />
    </form>
  )
};

CredentialsForm.propTypes = {
  label: string,
  user: string,
};

CredentialsForm.defaultProps = {
  label: "Label",
};

export default CredentialsForm;