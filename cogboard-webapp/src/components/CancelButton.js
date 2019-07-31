import React from 'react';

import Button from '@material-ui/core/Button';

const CancelButton = ({ handleCancelClick, className }) => (
  <Button
    onClick={handleCancelClick}
    className={className}
    variant="contained"
    color="secondary"
  >
    Cancel
  </Button>
);

export default CancelButton;