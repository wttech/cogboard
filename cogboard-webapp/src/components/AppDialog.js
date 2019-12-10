import React from 'react';
import { bool, element, func, string } from 'prop-types';
import styled from '@emotion/styled/macro';

import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import ComponentIdDisplay from './ComponentIdDisplay';

const StyledDialog = styled(props => (
  <Dialog classes={{ paper: 'paper' }} {...props} />
))`
  .paper {
    max-width: 800px;
    padding: 15px;
  }
`;

const StyledDialogContent = styled(DialogContent)`
  padding-bottom: 16px;
`;

const AppDialog = props => {
  const {
    children,
    handleDialogClose,
    open,
    title,
    disableBackdropClick,
    componentId
  } = props;

  const stopEventPropagation = event => event.stopPropagation();

  return (
    <StyledDialog
      disableBackdropClick={disableBackdropClick}
      onClick={stopEventPropagation}
      onClose={handleDialogClose}
      onKeyDown={stopEventPropagation}
      aria-labelledby="app-dialog-title"
      open={open}
      PaperProps={{ 'data-cy': props['data-cy'] }}
    >
      <DialogTitle id="app-dialog-title" data-cy="app-dialog-title">
        {title}
        <ComponentIdDisplay componentId={componentId} />
      </DialogTitle>
      <StyledDialogContent data-cy="app-dialog-content">
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
};

AppDialog.defaultProps = {
  title: ''
};

export default AppDialog;
