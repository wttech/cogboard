import React from 'react';

import { useToggle } from '../hooks';

import { IconButton, Tooltip } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import ConfirmationDialog from './ConfirmationDialog';

const DeleteItem = ({ id, label, itemName, deleteAction }) => {
  const [dialogOpened, openDialog, handleDialogClose] = useToggle();

  const handleDelete = id => () => {
    deleteAction(id);
    handleDialogClose();
  };

  return (
    <>
      <Tooltip title="Delete" placement="bottom">
        <IconButton
          onClick={openDialog}
          data-cy={`delete-${itemName}-delete-button`}
        >
          <Delete />
        </IconButton>
      </Tooltip>
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

export default DeleteItem;
