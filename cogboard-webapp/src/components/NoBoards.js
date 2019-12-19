import React from 'react';
import { useSelector } from 'react-redux';

import { getIsAuthenticated } from '../selectors';

import { Typography } from '@material-ui/core';
import AddBoard from './AddBoard';

const NoBoards = ({ className }) => {
  const isAuthenticated = useSelector(getIsAuthenticated);

  return (
    <div className={className}>
      <div>
        <Typography color="primary" variant="h4">
          No boards found
        </Typography>
        {isAuthenticated && (
          <Typography color="primary" variant="subtitle1">
            Add first board
          </Typography>
        )}
        <AddBoard />
      </div>
    </div>
  );
};

export default NoBoards;
