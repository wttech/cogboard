import React, { useState } from 'react';
import { useTheme } from '@material-ui/styles';
import { Container } from '@material-ui/core';
import { Router } from '@reach/router';

import BoardActions from '../BoardActions';
import BoardIndex from '../BoardIndex';
import Board from '../Board';
import NavBar from '../NavBar';
import AddBoard from '../AddBoard';
import Notifications from '../Notifications';
import {
  StyledBoardList,
  StyledDrawer,
  StyledDrawerContainer,
  StyledLogo,
  StyledMain
} from './styled';

const MainTemplate = () => {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const theme = useTheme();

  const handleDrawerToggle = opened => event => {
    const { type, key } = event;

    if (type === 'keydown' && (key === 'Tab' || key === 'Shift')) {
      return;
    }

    setDrawerOpened(opened);
  };

  return (
    <>
      <NavBar handleDrawerToggle={handleDrawerToggle} />
      <StyledDrawer
        onClose={handleDrawerToggle(false)}
        open={drawerOpened}
        theme={theme}
      >
        <StyledDrawerContainer
          onClick={handleDrawerToggle(false)}
          onKeyDown={handleDrawerToggle(false)}
          role="presentation"
        >
          <StyledLogo />
          <AddBoard />
          <StyledBoardList />
        </StyledDrawerContainer>
      </StyledDrawer>
      <StyledMain>
        <Container maxWidth="xl">
          <Router>
            <BoardIndex path="/" />
            <Board path="/:boardId" />
          </Router>
          <BoardActions />
        </Container>
      </StyledMain>
      <Notifications />
    </>
  );
};

export default MainTemplate;
