import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useToggle } from '../hooks';
import { getToken } from '../utils/auth';
import { getIsAuthenticated } from '../selectors';
import { saveCredential } from '../actions/thunks';
import { URL } from '../constants';

import { IconButton } from '@material-ui/core';
import { Build } from '@material-ui/icons';
import AppDialog from './AppDialog';
import CredentialForm from './CredentialForm';

const EditCredential = ({ id }) => {
  const dispatch = useDispatch();
  const [dialogOpened, openDialog, handleDialogClose] = useToggle();

  const [credentialData, setCredentialData] = useState();
  const isAuthenticated = useSelector(getIsAuthenticated);

  const handleAddEndpointClick = () => {
    openDialog();
  };

  const handleSubmit = values => {
    delete values.passwordConfirmation;

    dispatch(saveCredential({ id, ...values }));
    handleDialogClose();
  };

  useEffect(() => {
    if (dialogOpened) {
      const init = isAuthenticated
        ? { headers: { Authorization: getToken() } }
        : undefined;

      fetch(`${URL.CREDENTIALS_ENDPOINT}/${id}`, init)
        .then(response => response.json())
        .then(data => setCredentialData(data))
        .catch(console.error);
    }
  }, [isAuthenticated, id, dialogOpened]);

  return (
    <>
      <IconButton
        onClick={handleAddEndpointClick}
        data-cy="edit-credential-add-button"
      >
        <Build />
      </IconButton>
      <AppDialog
        disableBackdropClick={true}
        handleDialogClose={handleDialogClose}
        open={dialogOpened}
        title="Edit credential"
      >
        {credentialData && (
          <CredentialForm
            onSubmit={handleSubmit}
            handleCancel={handleDialogClose}
            id={id}
            {...credentialData}
          />
        )}
      </AppDialog>
    </>
  );
};

export default EditCredential;
