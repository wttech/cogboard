import React from 'react';

import { useToggle } from '../hooks';

import { IconButton, Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import AppDialog from './AppDialog';
import EndpointForm from './EndpointForm';

const AddEndpoint = ({ largeButton, dataChanged }) => {
  const [dialogOpened, openDialog, handleDialogClose] = useToggle();

  const handleAddEndpointClick = (event) => {
    event.stopPropagation();
    openDialog();
  };

  const handleSubmit = (values) => (event) => {
    event.preventDefault();
    console.log(values);
    if (dataChanged !== undefined) {
      dataChanged();
    }
    handleDialogClose();
  }

  return (
    <>
      { largeButton ? 
      <Button
        color="primary"
        variant="contained"
        onClick={handleAddEndpointClick}
        data-cy="add-endpoint-add-button"
        fullWidth
      >
        Add Endpoint                                           
      </Button> : 
      <IconButton
        onClick={handleAddEndpointClick}
        color="primary"
        data-cy="add-endpoint-add-button"
      >
        <Add/>
      </IconButton> }
      <AppDialog
        disableBackdropClick={true}
        handleDialogClose={handleDialogClose}
        open={dialogOpened}
        title="Add new endpoint"
      >
        <EndpointForm 
          onSubmit={handleSubmit}
          handleCancel={handleDialogClose}
        />
      </AppDialog>
    </>
  );
};

export default AddEndpoint;