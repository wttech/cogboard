import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCurrentBoard } from '../../actions/actionCreators';
import { DEFAULT_BOARD_TYPE } from '../../constants';

import { getBoardConstructor } from './helpers';
import { StyledContainer, StyledNotFound, StyledNoBoards } from './styled';

const Board = ({ boardId, className }) => {
  const currentBoard = useSelector(({ boards }) => boards.boardsById[boardId]);
  const allBoardsLength = useSelector(({ boards }) => boards.allBoards).length;
  const dispatch = useDispatch();
  let columns, type, BoardType;

  useEffect(() => {
    boardId && dispatch(setCurrentBoard(boardId));
  }, [dispatch, boardId]);

  if (allBoardsLength === 0) {
    return <StyledNoBoards />;
  }

  if (!currentBoard) {
    return <StyledNotFound />;
  } else {
    columns = currentBoard.columns;
    type = currentBoard.type || DEFAULT_BOARD_TYPE;
    BoardType = getBoardConstructor(type);
  }

  return (
    <StyledContainer className={className} columns={columns} boardType={type}>
      <BoardType currentBoard={currentBoard} />
    </StyledContainer>
  );
};

export default Board;
