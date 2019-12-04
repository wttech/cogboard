import React, { forwardRef } from 'react';
import { bool, number, object, string } from 'prop-types';
import styled from '@emotion/styled/macro';

import { mapStatusToColor } from './helpers';
import { COLUMN_MULTIPLIER, ROW_MULTIPLIER } from '../../constants';

import { Card, CardHeader, CardContent, Collapse } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';

export const StyledCard = styled(
  forwardRef(
    (
      {
        status,
        columns,
        goNewLine,
        isLoggedIn,
        isDragging,
        isOver,
        rows,
        theme,
        ...other
      },
      ref
    ) => <Card {...other} ref={ref} />
  )
)`
  background: ${({ isDragging, status, theme }) =>
    !isDragging
      ? mapStatusToColor(status, theme)
      : theme.palette.background.paper};
  box-shadow: none;
  cursor: ${({ isLoggedIn }) => (isLoggedIn ? 'move' : 'default')};
  display: flex;
  flex-direction: column;
  grid-column-start: ${({ goNewLine }) => goNewLine === true && 1};
  grid-column-end: span ${({ columns }) => columns * COLUMN_MULTIPLIER};
  grid-row-end: span ${({ rows }) => rows * ROW_MULTIPLIER};
  position: relative;
  overflow: visible;

  ${({ isDragging, isOver, theme }) =>
    isDragging &&
    `
    &::before {
      background: ${theme.palette.background.paper};
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
`;

StyledCard.propTypes = {
  columns: number.isRequired,
  goNewLine: bool.isRequired,
  rows: number.isRequired,
  status: string.isRequired,
  theme: object.isRequired
};

export const StyledCardHeader = styled(CardHeader)`
  z-index: 1;
`;

export const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;

  &:last-child {
    padding-bottom: 16px;
  }

  .cardFootWrapper {
    display: inherit;
  }
`;

export const StyledCollapse = styled(Collapse)`
  position: absolute;
  bottom: 0px;
  transform: ${({ isExpanded }) =>
    isExpanded ? 'translateY(100%)' : 'translateY(0)'};
  width: 100%;
  height: auto;
  background-color: ${({ isDragging, status, theme }) =>
    !isDragging
      ? mapStatusToColor(status, theme)
      : theme.palette.background.paper};
  padding: 0 16px;
  opacity: ${({ isExpanded }) => (isExpanded ? 1 : 0)};
  transition: height transform 500ms linear, opacity 100ms linear;
  z-index: 3;
`;

export const StyledIconButton = styled(IconButton)`
  transform: ${({ isExpanded }) =>
    isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'};
  marginleft: auto;
`;
