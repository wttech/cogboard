import React, { useState } from 'react';
import styled from '@emotion/styled/macro';

import { useDialogToggle } from '../hooks';

import { Container, Drawer, Fab } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import AppDialog from './AppDialog';
import AddWidget from './AddWidget';
import Board from './Board';
import BoardList from './BoardList';
import Logo from './Logo';
import NavBar from './NavBar';

const StyledFab = styled(Fab)`
  bottom: 50px;
  position: absolute;
  right: 50px;
`;

const StyledBoardList = styled(BoardList)`
  padding: 32px;
  width: 100%;
`;

const StyledMain = styled.main`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-top: 110px;
`;

const StyledLogo = styled(Logo)`
  width: 40%;
`;

const StyledDrawerContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-top: 32px;
  width: 250px;
`;

const MainTemplate = (props) => {
  const [currentBoard, setCurrentBoard] = useState('board1');
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [dialogOpened, openDialog, handleDialogClose] = useDialogToggle();

  const handleBoardClick = (boardId) => () => {
    setCurrentBoard(boardId);
    handleDrawerToggle(false);
  };

  const handleDrawerToggle = opened => event => {
    const { type, key } = event;

    if (type === 'keydown' && (key === 'Tab' || key === 'Shift')) {
      return;
    }

    setDrawerOpened(opened);
  };

  const handleAddWidgetClick = () => {
    openDialog(true);
  };

  return (
    <>
      <NavBar handleDrawerToggle={handleDrawerToggle} />
      <Drawer
        onClose={handleDrawerToggle(false)}
        open={drawerOpened}
      >
        <StyledDrawerContainer
          onClick={handleDrawerToggle(false)}
          onKeyDown={handleDrawerToggle(false)}
          role="presentation"
        >
          <StyledLogo />
          <StyledBoardList handleBoardClick={handleBoardClick} />
        </StyledDrawerContainer>
      </Drawer>
      <StyledMain>
        <Container maxWidth="xl">
          <Board currentBoard={currentBoard} />
          <StyledFab
            onClick={handleAddWidgetClick}
            aria-label="Add Widget"
            color="primary"
          >
            <Add />
          </StyledFab>
        </Container>
      </StyledMain>
      <AppDialog
        handleDialogClose={handleDialogClose}
        open={dialogOpened}
        title="Add new widget"
      >
        <AddWidget
          closeDialog={handleDialogClose}
          currentBoard={currentBoard}
        />
      </AppDialog>
    </>
  );
}

export default MainTemplate;