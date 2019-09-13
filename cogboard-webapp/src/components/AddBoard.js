import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { useDialogToggle } from '../hooks';
import { addNewBoard } from '../actions/thunks';

import { IconButton } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import AppDialog from './AppDialog';
import BoardForm from './BoardForm';


const AddBoard = () => {
  const [dialogOpened, openDialog, handleDialogClose] = useDialogToggle();
  const dispatch = useDispatch();
  const isAdmin = useSelector(({app}) => app.isAdmin);

  const handleAddBoardClick = (event) => {
    event.stopPropagation();
    openDialog();
  };

  const handleAddActionClick = values => {
    dispatch(addNewBoard(values));
    handleDialogClose();
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <IconButton
        onClick={handleAddBoardClick}
        color="primary">
        <Add />
      </IconButton>
      <AppDialog
        handleDialogClose={handleDialogClose}
        open={dialogOpened}
        title="Add new board"
      >
        <BoardForm 
          onSubmit={handleAddActionClick}
          onCancel={handleDialogClose}
        />
      </AppDialog>
    </>
  );
};

export default AddBoard;