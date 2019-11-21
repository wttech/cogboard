import React from 'react';
import { useDispatch } from 'react-redux';

import { useToggle } from '../hooks';
import { saveEndpoint } from '../actions/thunks';

import AddButton from './AddButton';
import AppDialog from './AppDialog';
import EndpointForm from './EndpointForm';

const AddEndpoint = ({ largeButton, dataChanged, endpointsData }) => {
  const [dialogOpened, openDialog, handleDialogClose] = useToggle();
  const dispatch = useDispatch();

  const handleAddEndpointClick = event => {
    event.stopPropagation();
    openDialog();
  };

  const handleSubmit = values => {
    dispatch(saveEndpoint(values));
    if (dataChanged !== undefined) {
      dataChanged();
    }
    handleDialogClose();
  };

  return (
    <>
      <AddButton
        color="primary"
        onClick={handleAddEndpointClick}
        data-cy="add-endpoint-add-button"
        largeButton={largeButton}
      >
        Add endpoint
      </AddButton>
      <AppDialog
        disableBackdropClick={true}
        handleDialogClose={handleDialogClose}
        open={dialogOpened}
        title="Add new endpoint"
      >
        <EndpointForm
          onSubmit={handleSubmit}
          handleCancel={handleDialogClose}
          endpointData={endpointsData}
        />
      </AppDialog>
    </>
  );
};

export default AddEndpoint;
