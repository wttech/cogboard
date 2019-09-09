import React from 'react';
import { useSelector } from 'react-redux';

import Box from '@material-ui/core/Box';
import { StyledBoardCard } from './styled';

const BoardList = ({ className }) => {
  const boards = useSelector(
    ({ boards }) => {
      const { boardsById, allBoards } = boards;

      return allBoards.map(boardId => boardsById[boardId]);
    }
  );

  return (
    <Box className={className}>
      {boards.map(boardData => (
        <StyledBoardCard
          boardData={boardData}
          key={boardData.id}
        />
      ))}
    </Box>
  );
};

export default BoardList;