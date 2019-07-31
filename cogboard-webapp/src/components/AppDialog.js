import React from 'react';
import styled from '@emotion/styled/macro';

import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';

const StyledDialog = styled(props => <Dialog classes={{ paper: 'paper' }} {...props} />)`
  .paper {
    padding: 15px;
  }
`;

const StyledDialogContent = styled(DialogContent)`
  padding-bottom: 16px;
`;

const AppDialog = props => {
  const { children, handleDialogClose, open, title } = props;

  return (
    <StyledDialog
      onClose={handleDialogClose}
      aria-labelledby="widget-dialog-title"
      open={open}
    >
      <DialogTitle id="widget-dialog-title">{title}</DialogTitle>
      <StyledDialogContent>
        {children}
      </StyledDialogContent>
    </StyledDialog>
  );
};

export default AppDialog;