import React from 'react';
import { func } from 'prop-types';
import styled from '@emotion/styled/macro';
import { useTheme } from '@material-ui/core/styles';

import { setSize } from './helpers';

import { AppBar, Container, Toolbar, IconButton } from '@material-ui/core';
import { DashboardRounded } from '@material-ui/icons';
import BoardSwitcher from './BoardSwitcher';
import UserLogin from "./UserLogin";

const StyledBoardSwitcher = styled(BoardSwitcher)`
  align-items: center;
  display: flex;
  margin-left: auto;
`;

const StyledAppBar = styled(AppBar)`
  background-color: transparent;
  box-shadow: none;
`;

const StyledToolbar = styled(Toolbar)`
  min-height: ${setSize(10)};
`;

const NavBar = ({ handleDrawerToggle }) => {
  const theme = useTheme();

  return (
    <StyledAppBar position="fixed">
      <Container maxWidth="xl">
        <StyledToolbar
          disableGutters
          theme={theme}
        >
          <IconButton
            onClick={handleDrawerToggle(true)}
            aria-label="Open boards drawer"
            color="inherit"
            edge="start"
          >
            <DashboardRounded />
          </IconButton>
          <UserLogin/>
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