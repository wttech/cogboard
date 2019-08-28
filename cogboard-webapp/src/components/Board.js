import React from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled/macro';
import { useTheme } from '@material-ui/core/styles'

import { setSize } from './helpers';

import Typography from '@material-ui/core/Typography';
import WidgetList from './WidgetList';

const getColumns = props => props.columns;

const StyledContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(${getColumns}, 1fr);
  grid-auto-rows: 1fr;
`;

const StyledTitle = styled(Typography)`
  align-self: flex-start;
  margin-bottom: ${setSize(5)};

  &::after {
    background-color: #ff8a65;
    content: '';
    display: block;
    height: 2px;
    margin-top: ${setSize(2)};
    margin-left: 3px;
    width: ${setSize(10)};
  }
`;

const Board = ({ className }) => {
  const currentBoard = useSelector(({ ui, boards }) => boards.boardsById[ui.currentBoard]);
  const { title, columns, widgets } = currentBoard || {};
  const theme = useTheme();

  if (!currentBoard) {
    return null;
  }

  return (
    <>
      <StyledTitle
        component="h2"
        variant="h3"
        theme={theme}
      >
        {title}
      </StyledTitle>
      <StyledContainer
        className={className}
        columns={columns}
      >
        <WidgetList widgets={widgets} />
      </StyledContainer>
    </>
  );
};

export default Board;