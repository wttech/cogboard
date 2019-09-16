import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { navigate } from '@reach/router';

import { getSwitcherBoards, getSwitchInterval, getBoardTitle, getCurrentBoardId } from '../../selectors';
import { getPrevAndNextIndex } from './helpers';

export const useBoardSwitching = () => {
  const switcherBoards = useSelector(getSwitcherBoards);
  const currentBoardId = useSelector(getCurrentBoardId);
  const hasBoardsToSwitch = switcherBoards.length > 1;
  const initialBoardIndex = switcherBoards.includes(currentBoardId) ? switcherBoards.indexOf(currentBoardId) : 0;
  const [boardIndex, setIndex] = useState(initialBoardIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [prevBoardIndex, nextBoardIndex] = getPrevAndNextIndex(switcherBoards, boardIndex);
  const switchInterval = useSelector(state => getSwitchInterval(state, switcherBoards[boardIndex]));
  const prevBoardTitle = useSelector(state => getBoardTitle(state, switcherBoards[prevBoardIndex]));
  const nextBoardTitle = useSelector(state => getBoardTitle(state, switcherBoards[nextBoardIndex]));

  const switchBoard = useCallback(
    (direction) => {
      const switchDirection = {
        next: nextBoardIndex,
        prev: prevBoardIndex
      };
      const currentBoardIndex = switchDirection[direction];

      setIndex(currentBoardIndex);
    },
    [nextBoardIndex, prevBoardIndex]
  );

  const handleBoardsSwitch = (direction) => () => {
    if (!hasBoardsToSwitch) {
      return;
    }

    switchBoard(direction);
    setTimeElapsed(0);
  };

  const handlePlayToggle = () => {
    setIsPlaying(prevState => !prevState);
  };

  useEffect(
    () => {
      navigate(switcherBoards[boardIndex] || switcherBoards[0]);
    },
    [boardIndex, switcherBoards]
  );

  useEffect(
    () => {
      if (isPlaying) {
        const interval = setInterval(() => {
          setTimeElapsed(prevState => prevState + 1);

          if (timeElapsed >= switchInterval) {
            switchBoard('next');
            setTimeElapsed(0);
          }
        }, 1000);

        return () => clearInterval(interval);
      }
    },
    [isPlaying, timeElapsed, switchInterval, switchBoard]
  );

  return {
    handleBoardsSwitch,
    handlePlayToggle,
    hasBoardsToSwitch,
    isPlaying,
    nextBoardTitle,
    prevBoardTitle,
    switchInterval,
    timeElapsed
  };
};