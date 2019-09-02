import React from 'react'
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled/macro';

import { useDialogToggle } from '../hooks';
import { addNewBoard } from '../actions/thunks';

import { Button, IconButton } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import AppDialog from './AppDialog';
import CancelButton from './CancelButton';
import BoardForm from './BoardForm';

const StyledCancelButton = styled(CancelButton)`
  margin-left: 20px;
`;

const AddBoard = () => {
  const [dialogOpened, openDialog, handleDialogClose] = useDialogToggle();
  const dispatch = useDispatch();

  const handleAddBoardClick = (event) => {
    event.stopPropagation();
    openDialog();
  };

  const handleAddActionClick = values => () => {
    dispatch(addNewBoard(values));
    handleDialogClose();
  };

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
        <BoardForm renderActions={values => (
            <>
              <Button
                onClick={handleAddActionClick(values)}
                color="primary"
                variant="contained"
              >
                Add
              </Button>
              <StyledCancelButton handleCancelClick={handleDialogClose} />
            </>
          )}
        />
      </AppDialog>
    </>
  );
};

export default AddBoard;