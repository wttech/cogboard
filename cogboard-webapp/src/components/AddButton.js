import React from 'react';

import { IconButton, Button, Tooltip } from '@material-ui/core';
import { Add } from '@material-ui/icons';

const AddButton = ({ largeButton, children, ...props }) => (
  <>
    {largeButton ? (
      <Button variant="contained" fullWidth {...props}>
        {children}
      </Button>
    ) : (
      <Tooltip title="Add new item" placement="bottom">
        <IconButton {...props} color="inherit">
          <Add />
        </IconButton>
      </Tooltip>
    )}
  </>
);

export default AddButton;
