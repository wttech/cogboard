import React from 'react';
import { object } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from '@reach/router';

import { useToggle } from '../../hooks';
import { deleteBoardWithWidgets } from '../../actions/thunks';
import { getIsAuthenticated } from '../../selectors';

import { CardHeader, CardContent, IconButton } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons'
import AppDialog from '../AppDialog';
import EditBoard from '../EditBoard';
import { StyledCard, StyledCardActions } from './styled';

const BoardCard = ({ boardData, className }) => {
  const {
    autoSwitch,
    columns,
    id,
    switchInterval,
    title
  } = boardData;
  const [open, openDialog, handleDialogClose] = useToggle();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(getIsAuthenticated);

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
    <div className={className} data-cy="board-card">
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
          data-cy="board-card-header"
        />
        <CardContent>
        </CardContent>
        {isAuthenticated &&
          <StyledCardActions>
            <IconButton
              onClick={handleEditClick}
              aria-label="edit"
              size="small"
              data-cy="board-card-edit-button"
            >
              <Edit />
            </IconButton>
            <IconButton
              onClick={handleDeleteClick}
              aria-label="delete"
              size="small"
              data-cy="board-card-delete-button"
            >
              <Delete />
            </IconButton>
          </StyledCardActions>
        }
      </StyledCard>
      <AppDialog
        disableBackdropClick={true}
        handleDialogClose={handleDialogClose}
        open={open}
        title={`Edit ${title}`}
        data-cy="board-card-edit-dialog"
      >
        <EditBoard
          closeDialog={handleDialogClose}
          autoSwitch={autoSwitch}
          columns={columns}
          id={id}
          switchInterval={switchInterval}
          title={title}
        />
      </AppDialog>
    </div>
  );
};

BoardCard.propTypes = {
  boardData: object.isRequired
};

export default BoardCard;