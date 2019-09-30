import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Router } from "@reach/router";

import { useToggle } from '../../hooks';
import { saveData } from '../../actions/thunks';

import { Container, Drawer, Fab } from '@material-ui/core';
import { Add, Save } from '@material-ui/icons';
import AppDialog from '../AppDialog';
import AddWidget from '../AddWidget';
import BoardIndex from '../BoardIndex';
import Board from '../Board';
import NavBar from '../NavBar';
import AddBoard from '../AddBoard';
import { StyledActions,
  StyledBoardList,
  StyledDrawerContainer,
  StyledLogo,
  StyledMain,
  StyledSaveFab
} from './styled';

const MainTemplate = () => {
  const currentBoardId = useSelector(({ ui }) => ui.currentBoard);
  const isDataChanged = useSelector(({ app }) => app.isDataChanged);
  const isAdmin = useSelector(({app}) => app.isAdmin);
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [dialogOpened, openDialog, handleDialogClose] = useToggle();
  const dispatch = useDispatch();

  const handleSaveDataClick = () => {
    dispatch(saveData());
  };

  const handleAddWidgetClick = () => {
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
          <AddBoard />
          <StyledBoardList />
        </StyledDrawerContainer>
      </Drawer>
      <StyledMain>
        <Container maxWidth="xl">
          <Router>
            <BoardIndex path="/" />
            <Board path="/:boardId" />
          </Router>
          <StyledActions>
            {isAdmin && isDataChanged &&
              <StyledSaveFab
                onClick={handleSaveDataClick}
                aria-label="Save Data"
                color="secondary"
                data-cy="main-template-save-data-button"
              >
                <Save />
              </StyledSaveFab>
            }
            {isAdmin && currentBoardId &&
              <Fab
                onClick={handleAddWidgetClick}
                aria-label="Add Widget"
                color="primary"
                data-cy="main-template-add-widget-button"
              >
                <Add />
              </Fab>
            }
          </StyledActions>
        </Container>
      </StyledMain>
      <AppDialog
        disableBackdropClick={true}
        handleDialogClose={handleDialogClose}
        open={dialogOpened}
        title="Add new widget"
      >
        <AddWidget
          closeDialog={handleDialogClose}
        />
      </AppDialog>
    </>
  );
};

export default MainTemplate;