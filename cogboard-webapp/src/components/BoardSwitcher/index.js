import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { navigate } from '@reach/router';

import { IconButton } from '@material-ui/core';
import { SkipPrevious, PlayArrow, SkipNext } from '@material-ui/icons';
import { StyledTimer } from './styled';

const BoardSwitcher = ({ className }) => {
  const switcherBoards = useSelector(
    ({ boards }) => boards.allBoards.filter(boardId => boards.boardsById[boardId].autoSwitch),
    shallowEqual
  );
  const { currentBoard } = useSelector(({ ui }) => ui);
  const currentBoardIndex = switcherBoards.includes(currentBoard) ? switcherBoards.indexOf(currentBoard) : 0;
  const lastBoardIndex = switcherBoards.length - 1;

  const handleBoardsSwitch = (direction) => () => {
    if (switcherBoards.length <= 1) {
      return;
    }

    const switchDirection = {
      next: currentBoardIndex < lastBoardIndex ? currentBoardIndex + 1 : 0,
      prev: currentBoardIndex > 0 ? currentBoardIndex - 1 : lastBoardIndex,
    };
    const boardIndex = switchDirection[direction];

    navigate(switcherBoards[boardIndex]);
  };

  return (
    <div className={className}>
      <StyledTimer>
        0:48
      </StyledTimer>
      <IconButton
        onClick={handleBoardsSwitch('prev')}
        color="inherit"
        aria-label="Open drawer"
        edge="start"
      >
        <SkipPrevious />
      </IconButton>
      <IconButton
        color="inherit"
        aria-label="Open drawer"
        edge="start"
      >
        <PlayArrow />
      </IconButton>
      <IconButton
        onClick={handleBoardsSwitch('next')}
        color="inherit"
        aria-label="Open drawer"
        edge="start"
      >
        <SkipNext />
      </IconButton>
    </div>
  );
};

export default BoardSwitcher;