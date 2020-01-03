import React, { forwardRef } from 'react';
import { bool, number, object } from 'prop-types';
import styled from '@emotion/styled/macro';

import { mapStatusToColor, getWidgetOverflow } from './helpers';
import { COLUMN_MULTIPLIER, ROW_MULTIPLIER, COLORS } from '../../constants';

import { Card, CardHeader, CardContent, Collapse } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';

export const StyledCard = styled(
  forwardRef(
    (
      {
        status,
        showShadow,
        showBorder,
        columns,
        goNewLine,
        isLoggedIn,
        isDragging,
        isOver,
        rows,
        theme,
        type,
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
  box-shadow: ${({ showShadow }) =>
    showShadow ? '2px 0px 4px 2px rgba(0,0,0,0.3)' : 'none'};
  border: ${({ showBorder }) =>
    showBorder ? '1px solid rgba(0,0,0,0.3)' : 'none'};
  cursor: ${({ isLoggedIn }) => (isLoggedIn ? 'move' : 'default')};
  display: flex;
  flex-direction: column;
  grid-column-start: ${({ goNewLine }) => goNewLine === true && 1};
  grid-column-end: span ${({ columns }) => columns * COLUMN_MULTIPLIER};
  grid-row-end: span ${({ rows }) => rows * ROW_MULTIPLIER};
  position: relative;
  overflow: ${({ type }) => getWidgetOverflow(type)};
  .MuiCardContent-root {
    padding: 8px;
  }

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
    color: ${COLORS.WHITE};

    &:hover {
      text-decoration: none;
    }
  }
`;

StyledCard.propTypes = {
  columns: number.isRequired,
  goNewLine: bool.isRequired,
  rows: number.isRequired,
  theme: object.isRequired
};

StyledCard.defaultProps = {
  status: ''
};

export const StyledCardHeader = styled(CardHeader)`
  z-index: 1;
  padding: 8px;
`;

export const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  justify-content: space-between;

  &:last-child {
    padding-bottom: 8px;
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
  bottom: 2px;
  background-color: ${({ isDragging, status, theme }) =>
    !isDragging
      ? mapStatusToColor(status, theme)
      : theme.palette.background.paper};
  box-shadow: ${({ isExpanded }) =>
    isExpanded ? '4px 4px 4px rgba(0,0,0,0.3)' : 'none'};
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
  margin-left: auto;
  transform: ${({ isExpanded }) =>
    isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform 100ms linear;
`;

export const StyledStatusIconButton = styled.a`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  transition: 0.2s background-color;
  border-radius: 2px;
  padding: 5px 0;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const StyledIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
