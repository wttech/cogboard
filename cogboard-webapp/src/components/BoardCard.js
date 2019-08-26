import React from 'react';
import { func, object } from 'prop-types';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled/macro';

import { useDialogToggle } from '../hooks';
import { setCurrentBoard} from '../actions/actionCreators';
import { deleteBoardWithWidgets } from '../actions/thunks';

import { Card, CardActions, CardHeader, CardContent, IconButton } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons'
import AppDialog from './AppDialog';
import EditBoard from './EditBoard';

const StyledCard = styled(Card)`
  background-color: #5c6bc0;
`;

const StyledCardActions = styled(CardActions)`
  justify-content: flex-end;
`;

const BoardCard = ({ boardData, className }) => {
  const {
    columns,
    id,
    title
  } = boardData;
  const [open, openDialog, handleDialogClose] = useDialogToggle();
  const dispatch = useDispatch();

  const handleBoardClick = (boardId) => () => {
    dispatch(setCurrentBoard(boardId));
  };

  const handleEditClick = (event) => {
    event.stopPropagation();
    openDialog();
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    dispatch(deleteBoardWithWidgets(id));
  };

  return (
    <div className={className}>
      <StyledCard onClick={handleBoardClick(id)}>
        <CardHeader
          title={title}
          titleTypographyProps={
            {
              component: 'h3',
              variant: 'subtitle2',
              color: 'textPrimary'
            }
          }
        />
        <CardContent>
        </CardContent>
        <StyledCardActions>
          <IconButton
            onClick={handleEditClick}
            aria-label="edit"
            size="small"
          >
            <Edit />
          </IconButton>
          <IconButton
            onClick={handleDeleteClick}
            aria-label="delete"
            size="small"
          >
            <Delete />
          </IconButton>
        </StyledCardActions>
      </StyledCard>
      <AppDialog
        handleDialogClose={handleDialogClose}
        open={open}
        title={`Edit ${title}`}
      >
        <EditBoard
          closeDialog={handleDialogClose}
          id={id}
          title={title}
          columns={columns}
        />
      </AppDialog>
    </div>
  );
};

BoardCard.propTypes = {
  handleBoardClick: func.isRequired,
  boardData: object.isRequired
}

export default BoardCard;