import React, { useState } from 'react';

import { Menu, MenuList, IconButton } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';

const MoreMenu = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMoreButtonClick = ({ currentTarget }) => setAnchorEl(currentTarget);

  const handleMoreMenuClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton
        onClick={handleMoreButtonClick}
        aria-label="More"
        aria-controls="more-menu"
        aria-haspopup="true"
      >
        <MoreVert />
      </IconButton>
      <Menu
        onClose={handleMoreMenuClose}
        anchorEl={anchorEl}
        id="more-menu"
        keepMounted
        open={Boolean(anchorEl)}
      >
        <MenuList>
          {children(handleMoreMenuClose)}
        </MenuList>
      </Menu>
    </>
  );
}

export default MoreMenu;