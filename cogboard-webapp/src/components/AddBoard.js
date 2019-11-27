import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useToggle } from '../hooks';
import { addNewBoard } from '../actions/thunks';
import { getIsAuthenticated } from '../selectors';

import { IconButton } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import AppDialog from './AppDialog';
import BoardForm from './BoardForm';

const AddBoard = () => {
  const [dialogOpened, openDialog, handleDialogClose] = useToggle();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(getIsAuthenticated);

  const handleAddBoardClick = event => {
    event.stopPropagation();
    openDialog();
  };

  const handleAddActionClick = values => {
    dispatch(addNewBoard(values));
    handleDialogClose();
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <IconButton
        onClick={handleAddBoardClick}
        color="primary"
        data-cy="add-board-add-button"
      >
        <Add />
      </IconButton>
      <AppDialog
        disableBackdropClick={true}
        handleDialogClose={handleDialogClose}
        open={dialogOpened}
        title="Add new board"
      >
        <BoardForm
          handleSubmit={handleAddActionClick}
          handleCancel={handleDialogClose}
        />
      </AppDialog>
    </>
  );
};

export default AddBoard;
