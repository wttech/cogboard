import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@material-ui/styles';

import { useToggle } from '../../hooks';
import { saveData, loadSettings } from '../../actions/thunks';
import { getIsAuthenticated } from '../../selectors';

import { Router } from '@reach/router';
import { Container, Fab } from '@material-ui/core';
import { Add, Save } from '@material-ui/icons';
import AppDialog from '../AppDialog';
import AddWidget from '../AddWidget';
import BoardIndex from '../BoardIndex';
import Board from '../Board';
import NavBar from '../NavBar';
import AddBoard from '../AddBoard';
import Notifications from '../Notifications';
import {
  StyledActions,
  StyledBoardList,
  StyledDrawer,
  StyledDrawerContainer,
  StyledLogo,
  StyledMain,
  StyledSaveFab,
  StyledSettingsMenu
} from './styled';

const MainTemplate = () => {
  const currentBoardId = useSelector(({ ui }) => ui.currentBoard);
  const isDataChanged = useSelector(({ app }) => app.isDataChanged);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [dialogOpened, openDialog, handleDialogClose] = useToggle();
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleSaveDataClick = () => {
    dispatch(saveData());
  };

  const handleAddWidgetClick = () => {
    dispatch(loadSettings());
    openDialog(true);
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
        <StyledSettingsMenu />
      </StyledDrawer>
      <StyledMain>
        <Container maxWidth="xl">
          <Router>
            <BoardIndex path="/" />
            <Board path="/:boardId" />
          </Router>
          <StyledActions>
            {isAuthenticated && isDataChanged && (
              <StyledSaveFab
                onClick={handleSaveDataClick}
                aria-label="Save Data"
                color="secondary"
                data-cy="main-template-save-data-button"
              >
                <Save />
              </StyledSaveFab>
            )}
            {isAuthenticated && currentBoardId && (
              <Fab
                onClick={handleAddWidgetClick}
                aria-label="Add Widget"
                color="primary"
                data-cy="main-template-add-widget-button"
              >
                <Add />
              </Fab>
            )}
          </StyledActions>
        </Container>
      </StyledMain>
      <Notifications />
      <AppDialog
        disableBackdropClick={true}
        handleDialogClose={handleDialogClose}
        open={dialogOpened}
        title="Add new widget"
        data-cy="main-template-add-widget-dialog"
      >
        <AddWidget closeDialog={handleDialogClose} />
      </AppDialog>
    </>
  );
};

export default MainTemplate;
