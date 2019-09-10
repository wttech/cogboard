import React from 'react';
import { func, string } from 'prop-types';
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import styled from "@emotion/styled/macro";

import AppDialog from "./AppDialog";

const StyledCancelButton = styled(Button)`
  margin-left: 1em;
`;

const StyledButtonBox = styled(Box)`
  margin-top: 1em;
`;

const ConfirmationDialog = props => {
  const { open, title, content, handleOk, labelOk, handleCancel, labelCancel } = props;
  const handleDialogClose = handleCancel || handleOk;

  return (
    <AppDialog
      handleDialogClose={handleDialogClose}
      open={open}
      title={title}
    >
      <Typography id="confirmation-dialog-content">
        {content}
      </Typography>
      <StyledButtonBox display="flex" justifyContent="flex-end">
        <Button onClick={handleOk} variant="contained" color="primary" autoFocus>
          {labelOk}
        </Button>
        {handleCancel &&
        <StyledCancelButton onClick={handleCancel} variant="outlined" color="primary">
          {labelCancel}
        </StyledCancelButton>}
      </StyledButtonBox>
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