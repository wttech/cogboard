import React from 'react';
import { useSelector } from 'react-redux';
import { func } from 'prop-types';
import styled from '@emotion/styled/macro';
import { useTheme } from '@material-ui/core/styles';

import { AppBar, Container, Toolbar, IconButton } from '@material-ui/core';
import { DashboardRounded } from '@material-ui/icons';
import { StyledTitle } from './styled';

import BoardSwitcher from './BoardSwitcher';
import UserLogin from './UserLogin';
import SettingsMenu from './SettingsMenu';
import { getBackgroundColor, getSize } from '../utils/components';

const StyledBoardSwitcher = styled(BoardSwitcher)`
  align-items: center;
  display: flex;
  margin-left: auto;
`;

const StyledAppBar = styled(AppBar)`
  background-color: ${getBackgroundColor('default')};
  box-shadow: none;
`;

const StyledToolbar = styled(Toolbar)`
  min-height: ${getSize(10)};
`;

const NavBar = ({ handleDrawerToggle }) => {
  const theme = useTheme();
  const noBoardsFound =
    useSelector(({ boards }) => boards.allBoards).length === 0;
  const title = useSelector(({ ui, boards }) =>
    ui.currentBoard && boards.boardsById[ui.currentBoard]
      ? boards.boardsById[ui.currentBoard].title
      : ''
  );

  return (
    <StyledAppBar position="fixed" theme={theme}>
      <Container maxWidth="xl">
        <StyledToolbar disableGutters theme={theme}>
          <IconButton
            onClick={handleDrawerToggle(true)}
            aria-label="Open boards drawer"
            color="inherit"
            edge="start"
            data-cy="navbar-show-drawer-button"
          >
            <DashboardRounded color="primary" />
          </IconButton>
          <UserLogin />
          <SettingsMenu />
          {!noBoardsFound && (
            <StyledTitle
              component="h2"
              variant="h3"
              theme={theme}
              data-cy="navbar-title-header"
            >
              {title}
            </StyledTitle>
          )}
          <StyledBoardSwitcher />
        </StyledToolbar>
      </Container>
    </StyledAppBar>
  );
};

NavBar.propTypes = {
  handleDrawerToggle: func.isRequired
};

export default NavBar;
