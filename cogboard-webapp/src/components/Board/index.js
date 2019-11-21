import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCurrentBoard } from '../../actions/actionCreators';

import WidgetList from '../WidgetList';
import { StyledContainer, StyledNotFound, StyledNoBoards } from './styled';

const Board = ({ boardId, className }) => {
  const currentBoard = useSelector(({ boards }) => boards.boardsById[boardId]);
  const allBoardsLength = useSelector(({ boards }) => boards.allBoards).length;
  const { columns, widgets } = currentBoard || {};
  const dispatch = useDispatch();

  useEffect(() => {
    boardId && dispatch(setCurrentBoard(boardId));
  }, [dispatch, boardId]);

  if (allBoardsLength === 0) {
    return <StyledNoBoards />;
  }

  if (!currentBoard) {
    return <StyledNotFound />;
  }

  return (
    <StyledContainer className={className} columns={columns}>
      <WidgetList widgets={widgets} />
    </StyledContainer>
  );
};

export default Board;
