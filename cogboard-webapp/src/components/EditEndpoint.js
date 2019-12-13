import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useToggle } from '../hooks';
import { getToken } from '../utils/auth';
import { getIsAuthenticated } from '../selectors';
import { saveEndpoint } from '../actions/thunks';
import { URL } from '../constants';

import { IconButton } from '@material-ui/core';
import { Build } from '@material-ui/icons';
import AppDialog from './AppDialog';
import EndpointForm from './EndpointForm';

const EditEndpoint = ({ id }) => {
  const dispatch = useDispatch();
  const [dialogOpened, openDialog, handleDialogClose] = useToggle();

  const [endpointData, setEndpointData] = useState();
  const isAuthenticated = useSelector(getIsAuthenticated);

  const handleAddEndpointClick = () => {
    openDialog();
  };

  const handleSubmit = values => {
    dispatch(saveEndpoint({ id, ...values }));
    handleDialogClose();
  };

  useEffect(() => {
    if (dialogOpened) {
      const init = isAuthenticated
        ? { headers: { Authorization: getToken() } }
        : undefined;

      fetch(`${URL.ENDPOINTS_ENDPOINT}/${id}`, init)
        .then(response => response.json())
        .then(data => setEndpointData(data))
        .catch(console.error);
    }
  }, [isAuthenticated, id, dialogOpened]);

  return (
    <>
      <IconButton
        onClick={handleAddEndpointClick}
        data-cy="edit-endpoint-edit-button"
      >
        <Build />
      </IconButton>
      <AppDialog
        disableBackdropClick={true}
        handleDialogClose={handleDialogClose}
        open={dialogOpened}
        title="Edit endpoint"
      >
        {endpointData && (
          <EndpointForm
            onSubmit={handleSubmit}
            handleCancel={handleDialogClose}
            id={id}
            {...endpointData}
          />
        )}
      </AppDialog>
    </>
  );
};

export default EditEndpoint;
