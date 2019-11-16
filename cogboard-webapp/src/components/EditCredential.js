import React from 'react';

import { useToggle } from '../hooks';

import { IconButton } from '@material-ui/core';
import { Build } from '@material-ui/icons';
import AppDialog from './AppDialog';
import CredentialForm from './CredentialForm';

const EditCredential = ({
  id,
  dataChanged,
  credentialsData,
  ...initialFormValues
}) => {
  const [dialogOpened, openDialog, handleDialogClose] = useToggle();

  const handleAddEndpointClick = event => {
    event.stopPropagation();
    console.log(id);
    openDialog();
  };

  const handleSubmit = values => {
    console.log(values);
    if (dataChanged !== undefined) {
      dataChanged();
    }
    handleDialogClose();
  };

  return (
    <>
      <IconButton
        onClick={handleAddEndpointClick}
        data-cy="add-endpoint-add-button"
      >
        <Build />
      </IconButton>
      <AppDialog
        disableBackdropClick={true}
        handleDialogClose={handleDialogClose}
        open={dialogOpened}
        title="Edit credential"
      >
        <CredentialForm
          onSubmit={handleSubmit}
          handleCancel={handleDialogClose}
          id={id}
          credentialsData={credentialsData}
          {...initialFormValues}
        />
      </AppDialog>
    </>
  );
};

export default EditCredential;
