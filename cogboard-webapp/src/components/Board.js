import React from 'react';
import { string } from 'prop-types';
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

const Board = ({ currentBoard, className }) => {
  const board = useSelector(
    state => state.boards.boardsById[currentBoard]
  );
  const theme = useTheme();
  const { title, columns } = board;

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
        <WidgetList currentBoard={currentBoard} />
      </StyledContainer>
    </>
  );
}

Board.propTypes = {
  currentBoard: string.isRequired
};

export default Board;