import React from 'react';

import { useToggle } from '../hooks';

import { IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import ConfirmationDialog from './ConfirmationDialog';

const DeleteEnpoint = ({ id, label, dataChanged }) => {
  const [dialogOpened, openDialog, handleDialogClose] = useToggle();

  const handleDelete = (id) => () => {
    console.log(`Delete ${id}`);
    if (dataChanged !== undefined) {
      dataChanged();
    }
    handleDialogClose();
  };

  return (
    <>
      <IconButton
        onClick={openDialog}
        data-cy="delete-endpoint-delete-button"
      >
        <Delete />
      </IconButton>
      <ConfirmationDialog
        handleOk={handleDelete(id)}
        handleCancel={handleDialogClose}
        open={dialogOpened}
        title={`Delete ${label}`}
        content={`Are you sure you want to delete ${label}?`}
        labelOk="delete"
        labelCancel="cancel"
      />
    </>
  );
};

export default DeleteEnpoint;