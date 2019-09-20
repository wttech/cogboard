import React from 'react';
import { bool, element, func, string } from 'prop-types';
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
  const { children, handleDialogClose, open, title, disableBackdropClick } = props;

  const stopEventPropagation = (event) => event.stopPropagation();

  return (
    <StyledDialog
      disableBackdropClick={disableBackdropClick}
      onClick={stopEventPropagation}
      onClose={handleDialogClose}
      onKeyDown={stopEventPropagation}
      aria-labelledby="app-dialog-title"
      open={open}
    >
      <DialogTitle id="app-dialog-title">{title}</DialogTitle>
      <StyledDialogContent>
        {children}
      </StyledDialogContent>
    </StyledDialog>
  );
};

AppDialog.propTypes = {
  handleDialogClose: func.isRequired,
  children: element.isRequired,
  open: bool.isRequired,
  title: string
}

AppDialog.defaultProps = {
  title: '',
  disableBackdropClick: false
};

export default AppDialog;