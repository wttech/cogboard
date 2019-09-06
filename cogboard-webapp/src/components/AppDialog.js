import React from 'react';
import {bool, element, func, string} from 'prop-types';
import {Dialog, DialogContent, DialogTitle} from '@material-ui/core';
import makeStyles from "@material-ui/core/styles/makeStyles";

const dialogStyles = makeStyles({
  paper: {
    padding: '15px'
  },
});

const dialogContentStyles = makeStyles({
  root: {
    paddingBottom: '16px'
  },
});

const AppDialog = props => {
  const { children, handleDialogClose, open, title, styled } = props;
  const dialogClasses = dialogStyles();
  const dialogContentClasses = dialogContentStyles();

  const stopEventPropagation = (event) => event.stopPropagation();

  return (
    <Dialog
      onClick={stopEventPropagation}
      onClose={handleDialogClose}
      onKeyDown={stopEventPropagation}
      aria-labelledby="app-dialog-title"
      open={open}
      classes={styled? dialogClasses : null}
    >
      <DialogTitle id="app-dialog-title">{title}</DialogTitle>
      <DialogContent classes={styled? dialogContentClasses: null}>
        {children}
      </DialogContent>
    </Dialog>
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