import React from 'react';

import { useBoardSwitching } from './hooks';
import { formatTime } from './helpers';

import { IconButton, Tooltip } from '@material-ui/core';
import { SkipPrevious, PlayArrow, SkipNext, Pause } from '@material-ui/icons';
import { StyledTimer } from './styled';

const BoardSwitcher = ({ className }) => {
  const {
    handleBoardsSwitch,
    handlePlayToggle,
    isPlaying,
    switchInterval,
    timeElapsed,
    prevBoardTitle,
    nextBoardTitle
  } = useBoardSwitching();
  const timeLeft = switchInterval - timeElapsed;

  return (
    <div className={className}>
      <StyledTimer>{formatTime(timeLeft)}</StyledTimer>
      <Tooltip
        title={prevBoardTitle}
        placement="bottom-end"
      >
        <IconButton
          onClick={handleBoardsSwitch('prev')}
          color="inherit"
          aria-label="Next board"
          edge="start"
        >
          <SkipPrevious />
        </IconButton>
      </Tooltip>
      <IconButton
        onClick={handlePlayToggle}
        color="inherit"
        aria-label="Auto switch boards"
        edge="start"
      >
        {isPlaying ? <Pause /> : <PlayArrow />}
      </IconButton>
      <Tooltip
        title={nextBoardTitle}
        placement="bottom-end"
      >
        <IconButton
          onClick={handleBoardsSwitch('next')}
          color="inherit"
          aria-label="Next board"
          edge="start"
        >
          <SkipNext />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default BoardSwitcher;