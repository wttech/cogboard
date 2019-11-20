import React from 'react';
import { useDispatch } from 'react-redux';

import { useToggle } from '../hooks';

import { IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import ConfirmationDialog from './ConfirmationDialog';
import { deleteEndpoint } from '../actions/thunks';

const DeleteEnpoint = ({ id, label }) => {
  const dispatch = useDispatch();
  const [dialogOpened, openDialog, handleDialogClose] = useToggle();

  const handleDelete = id => () => {
    dispatch(deleteEndpoint(id));
    handleDialogClose();
  };

  return (
    <>
      <IconButton onClick={openDialog} data-cy="delete-endpoint-delete-button">
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
