import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCurrentBoard } from '../../actions/actionCreators';
import { DEFAULT_BOARD_TYPE } from '../../constants';

import { getBoardType } from './helpers';
import { StyledContainer, StyledNotFound, StyledNoBoards } from './styled';

const Board = ({ boardId, className }) => {
  const currentBoard = useSelector(({ boards }) => boards.boardsById[boardId]);
  const allBoardsLength = useSelector(({ boards }) => boards.allBoards).length;
  const dispatch = useDispatch();
  const BoardType = getBoardType(currentBoard);
  const { columns, type = DEFAULT_BOARD_TYPE } = currentBoard;

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
    <StyledContainer className={className} columns={columns} boardType={type}>
      <BoardType currentBoard={currentBoard} />
    </StyledContainer>
  );
};

export default Board;
