import React from 'react';
import {bool, func, string} from 'prop-types';
import Button from "@material-ui/core/Button";
import {Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import AppDialog from "./AppDialog";

const ConfirmationDialog = props => {
  const {open, title, content, handleOk, labelOk, handleCancel, labelCancel} = props;
  const handleDialogClose = handleCancel || handleOk;

  return (
    <AppDialog
      handleDialogClose={handleDialogClose}
      open={open}
      title={title}
    >
      <Grid
        container
        justify="flex-end"
        spacing={1}
      >
        <Grid item xs={12}>
          <Typography id="confirmation-dialog-content">
            {content}
          </Typography>
        </Grid>
        <Grid item xs={handleCancel ? 8 : 10}>
        </Grid>
        <Grid item xs={2}>
          <Button onClick={handleOk} variant="contained" color="primary" autoFocus>
            {labelOk}
          </Button>
        </Grid>
        {handleCancel && <Grid item xs={2}>
          <Button onClick={handleCancel} variant="outlined" color="primary">
            {labelCancel}
          </Button>
        </Grid>}
      </Grid>
    </AppDialog>
  );
};

ConfirmationDialog.propTypes = {
  open: bool.isRequired,
  handleOk: func.isRequired,
  title: string,
  content: string,
  labelOk: string,
  labelCancel: string
};

ConfirmationDialog.defaultProps = {
  title: '',
  content: '',
  labelOk: 'OK',
  labelCancel: 'Cancel'
};

export default ConfirmationDialog;