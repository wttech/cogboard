import React from 'react';

import { IconButton, Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';

const AddButton = ({ largeButton, children, ...props }) => (
  <>
    {largeButton ? (
      <Button variant="contained" fullWidth {...props}>
        {children}
      </Button>
    ) : (
      <IconButton {...props}>
        <Add />
      </IconButton>
    )}
  </>
);

export default AddButton;
