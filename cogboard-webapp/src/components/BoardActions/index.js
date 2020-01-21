import React from 'react';
import { useSelector } from 'react-redux';

import { getIsAuthenticated } from '../../selectors';
import { DEFAULT_BOARD_TYPE } from '../../constants';

import { StyledActions } from './styled';
import boardTypesConfig from '../boards/config';

const BoardActions = () => {
  const currentBoardId = useSelector(({ ui }) => ui.currentBoard) || '';
  const currentBoard = useSelector(
    ({ boards }) => boards.boardsById[currentBoardId]
  );
  const isAuthenticated = useSelector(getIsAuthenticated);
  let availableActions;

  if (currentBoard) {
    const currentBoardType = currentBoard.type || DEFAULT_BOARD_TYPE;
    availableActions = boardTypesConfig[currentBoardType].actions;
  }

  if (isAuthenticated && currentBoard) {
    return (
      <StyledActions>
        {availableActions.map(action => {
          const { component: Action, config } = action;

          return <Action config={config} key={config.ariaLabel} />;
        })}
      </StyledActions>
    );
  } else {
    return null;
  }
};

export default BoardActions;
