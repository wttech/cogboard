import React from 'react';
import { useSelector } from 'react-redux';

import { getIsAuthenticated } from '../selectors';

import AddBoard from './AddBoard';

const NoBoards = ({ className }) => {
  const isAuthenticated = useSelector(getIsAuthenticated);

  return (
    <div className={className}>
      <div>
        <h1>No boards found</h1>
        {isAuthenticated && <h3>Add first dashboard</h3>}
        <AddBoard />
      </div>
    </div>
  );
};

export default NoBoards;
