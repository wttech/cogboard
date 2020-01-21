import React from 'react';
import styled from '@emotion/styled/macro';

import { Drawer } from '@material-ui/core';
import BoardList from '../BoardList';
import Logo from '../Logo';
import { getBackgroundColor } from '../../utils/components';

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
`;

export const StyledDrawer = styled(props => (
  <Drawer classes={{ paper: 'paper' }} {...props} />
))`
  .paper {
    background: ${getBackgroundColor('default')};
    justify-content: space-between;
  }
`;
