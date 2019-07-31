import React from 'react';
import styled from '@emotion/styled/macro';

import { Typography, IconButton } from '@material-ui/core';
import { SkipPrevious, PlayArrow, SkipNext } from '@material-ui/icons';

const StyledTimer = styled(Typography)`
  margin-right: 20px;
`;

const BoardSwitcher = ({ className }) => {
  return (
    <div className={className}>
      <StyledTimer>
        0:48
      </StyledTimer>
      <IconButton
        color="inherit"
        aria-label="Open drawer"
        edge="start"
      >
        <SkipPrevious />
      </IconButton>
      <IconButton
        color="inherit"
        aria-label="Open drawer"
        edge="start"
      >
        <PlayArrow />
      </IconButton>
      <IconButton
        color="inherit"
        aria-label="Open drawer"
        edge="start"
      >
        <SkipNext />
      </IconButton>
    </div>
  )
}

export default BoardSwitcher;