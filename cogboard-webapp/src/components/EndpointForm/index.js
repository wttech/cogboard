import React from 'react';

import { string } from 'prop-types';
import { Button } from '@material-ui/core';
import { StyledCancelButton } from './styled';

const EndpointForm = ({ onSubmit, handleCancel, ...initialFormValues }) => {

  return (
    <form onSubmit={onSubmit({label: "label"})} noValidate="novalidate">
        <Button
          color="primary"
          variant="contained"
          type="submit"
          data-cy="endpoint-form-submit-button"
        >
          Save
        </Button>
        <StyledCancelButton
          handleCancelClick={handleCancel}
          data-cy="endpoint-form-cancel-button"
        />
    </form>
  )
};

EndpointForm.propTypes = {
  credentials: string,
  label: string,
  publicUrl: string,
  url: string,
};

EndpointForm.defaultProps = {
  label: "Label",
};

export default EndpointForm;