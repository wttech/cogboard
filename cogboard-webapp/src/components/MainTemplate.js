import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled/macro';

import { useDialogToggle } from '../hooks';
import { saveData } from '../actions/thunks';

import { Box, Container, Drawer, Fab } from '@material-ui/core';
import { Add, Save } from '@material-ui/icons';
import AppDialog from './AppDialog';
import AddWidget from './AddWidget';
import Board from './Board';
import BoardList from './BoardList';
import Logo from './Logo';
import NavBar from './NavBar';

const StyledActions = styled(Box)`
  bottom: 50px;
  position: absolute;
  right: 50px;
`;

const StyledSaveFab = styled(Fab)`
  margin-right: 16px;
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
  const dispatch = useDispatch();
  const dataChanged = useSelector(({ app }) => app.dataChanged);

  const handleSaveDataClick = () => {
    dispatch(saveData());
  };

  const handleAddWidgetClick = () => {
    openDialog(true);
  };

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
          <StyledActions>
            {dataChanged &&
              <StyledSaveFab
                onClick={handleSaveDataClick}
                aria-label="Save Data"
                color="secondary"
              >
                <Save />
              </StyledSaveFab>
            }
            <Fab
              onClick={handleAddWidgetClick}
              aria-label="Add Widget"
              color="primary"
            >
              <Add />
            </Fab>
          </StyledActions>
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
};

export default MainTemplate;