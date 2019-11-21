import React from 'react';
import { useDispatch } from 'react-redux';

import { useToggle } from '../hooks';

import AppDialog from './AppDialog';
import CredentialForm from './CredentialForm';
import { saveCredential } from '../actions/thunks';
import AddButton from './AddButton';

const AddCredential = ({ largeButton }) => {
  const [dialogOpened, openDialog, handleDialogClose] = useToggle();
  const dispatch = useDispatch();

  const handleAddCredentialClick = () => {
    openDialog();
  };

  const handleSubmit = values => {
    delete values.passwordConfirmation;

    dispatch(saveCredential(values));
    handleDialogClose();
  };

  return (
    <>
      <AddButton
        color="primary"
        onClick={handleAddCredentialClick}
        data-cy="add-credential-add-button"
        largeButton={largeButton}
      >
        Add credential
      </AddButton>
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
