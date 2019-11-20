import React from 'react';
import { useDispatch } from 'react-redux';

import { useToggle } from '../hooks';

import { IconButton, Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import AppDialog from './AppDialog';
import CredentialForm from './CredentialForm';
import { saveCredential } from '../actions/thunks';

const AddCredential = ({ largeButton }) => {
  const [dialogOpened, openDialog, handleDialogClose] = useToggle();
  const dispatch = useDispatch();

  const handleAddEndpointClick = () => {
    openDialog();
  };

  const handleSubmit = values => {
    delete values.passwordConfirmation;

    dispatch(saveCredential(values));
    handleDialogClose();
  };

  return (
    <>
      {largeButton ? (
        <Button
          color="primary"
          variant="contained"
          onClick={handleAddEndpointClick}
          data-cy="add-endpoint-add-button"
          fullWidth
        >
          Add Credential
        </Button>
      ) : (
        <IconButton
          onClick={handleAddEndpointClick}
          color="primary"
          data-cy="add-endpoint-add-button"
        >
          <Add />
        </IconButton>
      )}
      <AppDialog
        disableBackdropClick={true}
        handleDialogClose={handleDialogClose}
        open={dialogOpened}
        title="Add new credential"
      >
        <CredentialForm
          onSubmit={handleSubmit}
          handleCancel={handleDialogClose}
        />
      </AppDialog>
    </>
  );
};

export default AddCredential;
