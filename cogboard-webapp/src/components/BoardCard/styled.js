import React, { forwardRef } from 'react';
import styled from '@emotion/styled/macro';

import { Card, CardActions } from '@material-ui/core';

export const StyledCard = styled(forwardRef(({
  isLoggedIn,
  isDragging,
  isOver,
  theme,
  ...other
}, ref) => <Card {...other} ref={ref} />))`
  background-color: ${({ theme }) => theme.palette.background.board.card}};
  box-shadow: none;
  cursor: ${({ isLoggedIn }) => isLoggedIn ? 'move': 'default'};
  position: relative;

  ${({ isDragging, isOver, theme }) => isDragging && `
    &::before {
      background-color: ${theme.palette.background.board.dragged};
      border: ${isOver && `1px dashed ${theme.palette.action.hover}`};
      border-radius: inherit;
      content: '';
      display: block;
      height: 100%;
      position: absolute;
      z-index: 2;
      opacity: ${isDragging ? 1 : 0};
      width: 100%;
    }
  `}
`

export const StyledCardActions = styled(CardActions)`
  justify-content: flex-end;
  z-index: 1;
`;