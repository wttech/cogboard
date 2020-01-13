import React, { useRef } from 'react';
import { object } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from '@reach/router';
import { useTheme } from '@material-ui/styles';
import { useDrag, useDrop } from 'react-dnd';

import { useToggle } from '../../hooks';
import { deleteBoardWithWidgets } from '../../actions/thunks';
import { reorderBoard } from '../../actions/thunks';
import { ItemTypes } from '../../constants';
import { getIsAuthenticated } from '../../selectors';

import { CardHeader, CardContent, IconButton } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import AppDialog from '../AppDialog';
import EditBoard from '../EditBoard';
import { StyledCard, StyledCardActions } from './styled';
import ConfirmationDialog from '../ConfirmationDialog';

const BoardCard = ({ boardData, index, className }) => {
  const {
    autoSwitch,
    id,
    switchInterval,
    title,
    type,
    ...boardTypeData
  } = boardData;
  const [open, openDialog, handleDialogClose] = useToggle();
  const [
    confirmationDialogOpened,
    openConfirmationDialog,
    closeConfirmationDialog
  ] = useToggle();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isAuthenticated = useSelector(getIsAuthenticated);

  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.BOARD, id, index },
    canDrag: isAuthenticated,
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.BOARD,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const { id: sourceId, index: sourceIndex } = item;
      const targetIndex = index;

      if (sourceIndex === targetIndex) {
        return;
      }

      const { top, bottom } = ref.current.getBoundingClientRect();
      const dropTargetMiddleY = bottom - (bottom - top) / 2;
      const { y: dragSourceMouseY } = monitor.getClientOffset();

      const hasPointerPassedMiddle =
        (sourceIndex < targetIndex && dragSourceMouseY >= dropTargetMiddleY) ||
        (sourceIndex > targetIndex && dragSourceMouseY <= dropTargetMiddleY);

      if (!hasPointerPassedMiddle) {
        return;
      }

      dispatch(reorderBoard(sourceId, targetIndex));
      item.index = targetIndex;
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      dropResult: monitor.getSourceClientOffset()
    })
  });

  drag(drop(ref));

  const handleBoardClick = boardId => () => {
    navigate(boardId);
  };

  const handleEditClick = event => {
    event.stopPropagation();
    openDialog();
  };

  const handleDeleteClick = event => {
    event.stopPropagation();
    openConfirmationDialog();
  };

  const deleteBoard = () => {
    dispatch(deleteBoardWithWidgets(id));
    closeConfirmationDialog();
  };

  return (
    <div className={className} data-cy="board-card">
      <StyledCard
        onClick={handleBoardClick(id)}
        theme={theme}
        isLoggedIn={isAuthenticated}
        isDragging={isDragging}
        isOver={isOver}
        ref={ref}
      >
        <CardHeader
          title={title}
          titleTypographyProps={{
            component: 'h3',
            variant: 'subtitle2',
            color: 'textPrimary'
          }}
          data-cy="board-card-header"
        />
        <CardContent></CardContent>
        {isAuthenticated && (
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
        )}
      </StyledCard>
      <AppDialog
        disableBackdropClick={true}
        handleDialogClose={handleDialogClose}
        open={open}
        title={`Edit ${title}`}
        data-cy="board-card-edit-dialog"
      >
        <EditBoard
          type={type}
          closeDialog={handleDialogClose}
          autoSwitch={autoSwitch}
          id={id}
          switchInterval={switchInterval}
          title={title}
          {...boardTypeData}
        />
      </AppDialog>
      <ConfirmationDialog
        open={confirmationDialogOpened}
        title={`Delete ${title}`}
        content={`Are you sure you want to delete ${title}?`}
        handleOk={deleteBoard}
        labelOk="Delete"
        handleCancel={closeConfirmationDialog}
      />
    </div>
  );
};

BoardCard.propTypes = {
  boardData: object.isRequired
};

export default BoardCard;
