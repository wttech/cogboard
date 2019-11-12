import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { func } from 'prop-types';

import { getIsAuthenticated } from '../selectors';

import { Menu, MenuList, IconButton } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';

const MoreMenu = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isAuthenticated = useSelector(getIsAuthenticated);

  const handleMoreButtonClick = ({ currentTarget }) =>
    setAnchorEl(currentTarget);

  const handleMoreMenuClose = () => setAnchorEl(null);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <IconButton
        onClick={handleMoreButtonClick}
        aria-label="More"
        aria-controls="more-menu"
        aria-haspopup="true"
        data-cy="more-menu-button"
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
        <MenuList>{children(handleMoreMenuClose)}</MenuList>
      </Menu>
    </>
  );
};

MoreMenu.propTypes = {
  children: func.isRequired
};

export default MoreMenu;
