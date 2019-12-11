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

  a {
    color: #fff;

    &:hover {
      text-decoration: none;
    }
  }
`;

StyledCard.propTypes = {
  columns: number.isRequired,
  goNewLine: bool.isRequired,
  rows: number.isRequired,
  theme: object.isRequired,
  status: string
};

export const StyledCardHeader = styled(CardHeader)`
  z-index: 1;
  ${({ title }) => !title && `position: absolute; right: 0;`}
`;

export const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  justify-content: space-between;

  &:last-child {
    padding-bottom: 16px;
  }

  .cardFootWrapper {
    display: inherit;
    align-items: center;
  }
`;

export const StyledCollapse = styled(
  ({ isExpanded, isDragging, status, theme, ...props }) => (
    <Collapse {...props} />
  )
)`
  bottom: 1px;
  background-color: ${({ isDragging, status, theme }) =>
    !isDragging
      ? mapStatusToColor(status, theme)
      : theme.palette.background.paper};
  height: auto;
  opacity: ${({ isExpanded }) => (isExpanded ? 1 : 0)};
  padding: 0 16px 16px;
  position: absolute;
  transition: height transform 300ms linear, opacity 100ms linear;
  transform: ${({ isExpanded }) =>
    isExpanded ? 'translateY(100%)' : 'translateY(0)'};
  width: 100%;
  z-index: 3;
`;

export const StyledIconButton = styled(({ isExpanded, ...props }) => (
  <IconButton {...props} />
))`
  marginleft: auto;
  transform: ${({ isExpanded }) =>
    isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform 100ms linear;
`;

export const StyledStatusIconButton = styled(IconButton)`
  border-radius: 0;
  width: 100%;
`;
