import React from 'react';
import { useSelector } from 'react-redux';

import Board from './Board';

const IndexBoard = () => {
  const [firstBoardId] = useSelector(({ boards }) => boards.allBoards);

  return <Board boardId={firstBoardId} />;
};

export default IndexBoard;