import React from 'react';
import styled from '@emotion/styled/macro';
import { makeStyles } from '@material-ui/core/styles';

import { Box, Drawer, Fab } from '@material-ui/core';
import BoardList from '../BoardList';
import Logo from '../Logo';
import { getBackgroundColor } from '../../utils/components';
import SettingsMenu from '../SettingsMenu';

export const StyledActions = styled(Box)`
  bottom: 50px;
  position: fixed;
  right: 50px;
  z-index: 10000;
`;

export const StyledSaveFab = styled(Fab)`
  margin-right: 16px;
`;

export const StyledBoardList = styled(BoardList)`
  padding: 32px;
  width: 100%;
`;

export const StyledMain = styled.main`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-top: 110px;
`;

export const StyledLogo = styled(Logo)`
  width: 40%;
  margin-bottom: 32px;
`;

export const StyledDrawerContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-top: 32px;
  width: 250px;
  background: #fffafa;
`;

export const StyledDrawer = styled(props => (
  <Drawer classes={{ paper: 'paper' }} {...props} />
))`
  .paper {
    background: ${getBackgroundColor('default')};
    justify-content: space-between;
  }
`;

export const StyledSettingsMenu = styled(SettingsMenu)`
  align-self: flex-end;
  margin-right: 20px;
  margin-bottom: 20px;
`;
