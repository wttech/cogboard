import React from 'react';
import { func, string } from 'prop-types';

import { Button, Typography } from "@material-ui/core/index";
import AppDialog from "../AppDialog";
import { StyledButtonBox, StyledCancelButton } from "./styled";

const ConfirmationDialog = props => {
  const { open, title, content, handleOk, labelOk, handleCancel, labelCancel } = props;
  const handleDialogClose = handleCancel || handleOk;

  return (
    <AppDialog
      handleDialogClose={handleDialogClose}
      open={open}
      title={title}
    >
      <>
        <Typography id="confirmation-dialog-content">
          {content}
        </Typography>
        <StyledButtonBox display="flex" justifyContent="flex-end">
          <Button onClick={handleOk} variant="contained" color="primary" autoFocus data-cy="confirmation-dialog-ok">
            {labelOk}
          </Button>
          {handleCancel &&
          <StyledCancelButton onClick={handleCancel} variant="outlined" color="primary" data-cy="confirmation-dialog-cancel">
            {labelCancel}
          </StyledCancelButton>}
        </StyledButtonBox>
      </>
    </AppDialog>
  );
};

ConfirmationDialog.propTypes = {
  handleOk: func.isRequired,
  content: string,
  labelOk: string,
  labelCancel: string
};

ConfirmationDialog.defaultProps = {
  content: '',
  labelOk: 'OK',
  labelCancel: 'Cancel'
};

export default ConfirmationDialog;