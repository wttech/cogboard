import React, { useEffect } from 'react';
import { useTheme } from '@material-ui/styles';

import { useBoardSwitching, usePrevious } from './hooks';
import { formatTime } from './helpers';

import { IconButton, Tooltip } from '@material-ui/core';
import { SkipPrevious, PlayArrow, SkipNext, Pause } from '@material-ui/icons';
import { StyledTimer } from './styled';

const BoardSwitcher = ({ className }) => {
  const theme = useTheme();
  const {
    handleBoardsSwitch,
    handlePlayToggle,
    handleResetTimeElapsed,
    hasBoardsToSwitch,
    isPlaying,
    isDisable,
    nextBoardTitle,
    prevBoardTitle,
    switchInterval,
    timeElapsed
  } = useBoardSwitching();
  const timeLeft = switchInterval - timeElapsed;
  const previousSwitchInterval = usePrevious(switchInterval);

  useEffect(() => {
    if (previousSwitchInterval !== switchInterval) {
      handleResetTimeElapsed();
    }
  });

  if (!hasBoardsToSwitch || isDisable) {
    return null;
  }

  return (
    <div className={className}>
      <StyledTimer theme={theme}>{formatTime(timeLeft)}</StyledTimer>
      <Tooltip title={prevBoardTitle} placement="bottom-end">
        <IconButton
          onClick={handleBoardsSwitch('prev')}
          color="primary"
          aria-label="Previous board"
          edge="start"
          data-cy="previous-board-button"
        >
          <SkipPrevious />
        </IconButton>
      </Tooltip>
      <IconButton
        onClick={handlePlayToggle}
        color="primary"
        aria-label="Auto switch boards"
        edge="start"
        data-cy="auto-switch-board-button"
      >
        {isPlaying ? <Pause /> : <PlayArrow />}
      </IconButton>
      <Tooltip title={nextBoardTitle} placement="bottom-end">
        <IconButton
          onClick={handleBoardsSwitch('next')}
          color="primary"
          aria-label="Next board"
          edge="start"
          data-cy="next-board-button"
        >
          <SkipNext />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default BoardSwitcher;
