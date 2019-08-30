import React, { useState } from 'react';
import { func } from 'prop-types';

import { Menu, MenuList, IconButton } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import {useSelector} from "react-redux";

const MoreMenu = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isAdmin = useSelector(({app}) => app.isAdmin);

  const handleMoreButtonClick = ({ currentTarget }) => setAnchorEl(currentTarget);

  const handleMoreMenuClose = () => setAnchorEl(null);

  return isAdmin ? (
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
  ) : '';
};

MoreMenu.propTypes = {
  children: func.isRequired
};

export default MoreMenu;