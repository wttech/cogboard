import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux';

import { setCurrentBoard } from '../../actions/actionCreators';

import WidgetList from '../WidgetList';
import { StyledContainer, StyledTitle } from './styled';

const Board = ({ boardId, className }) => {
  const currentBoard = useSelector(({ boards }) => boards.boardsById[boardId]);
  const { title, columns, widgets } = currentBoard || {};
  const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    boardId && dispatch(setCurrentBoard(boardId));
  }, [dispatch, boardId]);

  if (!currentBoard) {
    return null;
  }

  return (
    <>
      <StyledTitle
        component="h2"
        variant="h3"
        theme={theme}
      >
        {title}
      </StyledTitle>
      <StyledContainer
        className={className}
        columns={columns}
      >
        <WidgetList widgets={widgets} />
      </StyledContainer>
    </>
  );
};

export default Board;