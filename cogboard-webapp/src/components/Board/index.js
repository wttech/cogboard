import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCurrentBoard } from '../../actions/actionCreators';

import { StyledContainer, StyledNotFound, StyledNoBoards } from './styled';
import boardTypes from '../boards';

const Board = ({ boardId, className }) => {
  const currentBoard = useSelector(({ boards }) => boards.boardsById[boardId]);
  const allBoardsLength = useSelector(({ boards }) => boards.allBoards).length;
  const dispatch = useDispatch();
  const BoardType = currentBoard.type
    ? boardTypes[currentBoard.type].component
    : '';

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
    <StyledContainer className={className} columns={currentBoard.columns}>
      <BoardType currentBoard={currentBoard} />
    </StyledContainer>
  );
};

export default Board;
