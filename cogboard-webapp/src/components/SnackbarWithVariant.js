import React from 'react';
import Snackbar from '@material-ui/core/Snackbar/index';
import SnackbarVariantContent from "./SnackbarVariantContent";

const SnackbarWithVariant = props => {
  const {open, handleClose, hideAfter, message, vertical, horizontal, variant} = props;

  return (
    <Snackbar
      anchorOrigin={{
        vertical: vertical,
        horizontal: horizontal
      }}
      open={open}
      autoHideDuration={hideAfter}
      onClose={handleClose}
    >
      <SnackbarVariantContent
        variant={variant}
        message={message}
      />
    </Snackbar>
  );
};

export default SnackbarWithVariant;