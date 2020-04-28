import React from 'react';

import Button from '@material-ui/core/Button';

const CancelButton = ({ handleCancelClick, className, ...other }) => (
  <Button
    onClick={handleCancelClick}
    className={className}
    variant="contained"
    color="default"
    {...other}
  >
    Cancel
  </Button>
);

export default CancelButton;
