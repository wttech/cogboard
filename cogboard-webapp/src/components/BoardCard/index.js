import React from 'react';
import { object } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from '@reach/router';

import { useToggle } from '../../hooks';
import { deleteBoardWithWidgets } from '../../actions/thunks';

import { CardHeader, CardContent, IconButton } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons'
import AppDialog from '../AppDialog';
import EditBoard from '../EditBoard';
import { StyledCard, StyledCardActions } from './styled';

const BoardCard = ({ boardData, className }) => {
  const {
    columns,
    id,
    title
  } = boardData;
  const [open, openDialog, handleDialogClose] = useToggle();
  const dispatch = useDispatch();
  const isAdmin = useSelector(({app}) => app.isAdmin);

  const handleBoardClick = (boardId) => () => {
    navigate(boardId);
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
        {isAdmin &&
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
        }
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
  boardData: object.isRequired
}

export default BoardCard;