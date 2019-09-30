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

import { CardHeader, CardContent, IconButton } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons'
import AppDialog from '../AppDialog';
import EditBoard from '../EditBoard';
import { StyledCard, StyledCardActions } from './styled';

const BoardCard = ({ boardData, index, className }) => {
  const {
    autoSwitch,
    columns,
    id,
    switchInterval,
    title
  } = boardData;
  const [open, openDialog, handleDialogClose] = useToggle();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isAdmin = useSelector(({app}) => app.isAdmin);

  const ref = useRef(null);
  const isLoggedIn = useSelector(({ app }) => !!app.jwToken);
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.BOARD, id, index },
    canDrag: isLoggedIn,
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
        return
      }
          
      const { top, bottom } = ref.current.getBoundingClientRect();
      const dropTargetMiddleY = bottom - (bottom - top) / 2;
      const { y: dragSourceMouseY } = monitor.getClientOffset();

      const hasPointerPassedMiddle = (sourceIndex < targetIndex && dragSourceMouseY >= dropTargetMiddleY) ||
        (sourceIndex > targetIndex && dragSourceMouseY <= dropTargetMiddleY)

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
      <StyledCard 
        onClick={handleBoardClick(id)}
        theme={theme}
        isLoggedIn={isLoggedIn}
        isDragging={isDragging}
        isOver={isOver}
        ref={ref}
      >
        {/* {isDragging ? <DragCover/>: null} */}
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