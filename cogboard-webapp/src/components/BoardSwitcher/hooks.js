import { useCallback, useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { navigate } from '@reach/router';

import { getSwitcherBoards, getSwitchInterval, getBoardTitle, getCurrentBoardId } from '../../selectors';
import { getPrevAndNextIndex } from './helpers';

export const useBoardSwitching = () => {
  const switcherBoards = useSelector(getSwitcherBoards);
  const currentBoardId = useSelector(getCurrentBoardId);
  const hasBoardsToSwitch = switcherBoards.length > 1;
  const boardIndex = switcherBoards.includes(currentBoardId) ? switcherBoards.indexOf(currentBoardId) : 0;
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [prevBoardIndex, nextBoardIndex] = getPrevAndNextIndex(switcherBoards, boardIndex);
  const switchInterval = useSelector(state => getSwitchInterval(state, switcherBoards[boardIndex]));
  const prevBoardTitle = useSelector(state => getBoardTitle(state, switcherBoards[prevBoardIndex]));
  const nextBoardTitle = useSelector(state => getBoardTitle(state, switcherBoards[nextBoardIndex]));
  const isDisable = !switcherBoards.includes(currentBoardId);

  const switchBoard = useCallback(
    (direction) => {
      const switchDirection = {
        next: nextBoardIndex,
        prev: prevBoardIndex
      };
      const currentBoardIndex = switchDirection[direction];

      navigate(switcherBoards[currentBoardIndex] || switcherBoards[0]);
    },
    [nextBoardIndex, prevBoardIndex, switcherBoards]
  );

  const handleBoardsSwitch = (direction) => () => {
    if (!hasBoardsToSwitch) {
      return;
    }

    switchBoard(direction);
    setTimeElapsed(0);
    setIsPlaying(false);
  };

  const handlePlayToggle = () => {
    setIsPlaying(prevState => !prevState);
  };

  const handleResetTimeElapsed = () => {
    setTimeElapsed(0);
  }

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
    handleResetTimeElapsed,
    hasBoardsToSwitch,
    isPlaying,
    isDisable,
    nextBoardTitle,
    prevBoardTitle,
    switchInterval,
    timeElapsed
  };
};

export const usePrevious = (value) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}