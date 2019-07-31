import React from 'react';
import styled from '@emotion/styled/macro';
import { useSelector } from 'react-redux';

import BoardCard from './BoardCard';
import Box from '@material-ui/core/Box';

const StyledBoardCard = styled(BoardCard)`
  margin-bottom: 32px;
`;

const BoardList = ({ handleBoardClick, className }) => {
  const boards = useSelector(
    ({ boards }) => {
      const { boardsById, allBoards } = boards;

      return allBoards.map(boardId => boardsById[boardId]);
    }
  );

  return (
    <Box className={className}>
      {boards.map(boardData =>
        <StyledBoardCard
          handleBoardClick={handleBoardClick}
          boardData={boardData}
          key={boardData.id}
        />
      )}
    </Box>
  );
};

export default BoardList;