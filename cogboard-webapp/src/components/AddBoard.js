import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled/macro';

import { useToggle } from '../hooks';
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
  const [dialogOpened, openDialog, handleDialogClose] = useToggle();
  const dispatch = useDispatch();
  const isAdmin = useSelector(({app}) => app.isAdmin);

  const handleAddBoardClick = (event) => {
    event.stopPropagation();
    openDialog();
  };

  const handleAddActionClick = values => {
    const { title, columns, switchInterval } = values;
    values.title = title.trim().replace(/\s+/g,' ');
    values.columns = parseInt(columns);
    if (switchInterval !== undefined) {
      values.switchInterval = parseInt(switchInterval)
    }
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
        color="primary"
        data-cy="add-board-button">
        <Add />
      </IconButton>
      <AppDialog
        handleDialogClose={handleDialogClose}
        open={dialogOpened}
        title="Add new board"
      >
        <BoardForm 
          onSubmit={handleAddActionClick}
          renderActions={() => (
            <>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                data-cy="board-form-submit-button"
              >
                Add
              </Button>
              <StyledCancelButton 
                handleCancelClick={handleDialogClose} 
                data-cy="board-form-cancel-button"
              />
            </>
          )}
        />
      </AppDialog>
    </>
  );
};

export default AddBoard;