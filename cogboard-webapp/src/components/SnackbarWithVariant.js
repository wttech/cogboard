import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { CheckCircle, Error, Info, Warning } from '@material-ui/icons';
import {amber, blue, green, red} from '@material-ui/core/colors';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import {makeStyles} from '@material-ui/core/styles';

const useVariantStyles = makeStyles(theme => ({
  success: {
    backgroundColor: green[300],
  },
  error: {
    backgroundColor: red[800],
  },
  info: {
    backgroundColor: blue[100],
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const variantIcon = {
  success: CheckCircle,
  warning: Warning,
  error: Error,
  info: Info,
};

const SnackbarVariantContent = props => {
  const { className, message, onClose, variant, ...other } = props;
  const classes = useVariantStyles();
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="message-snackbar"
      message={
        <span id="message-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)}/>
          {message}
        </span>
      }
      {...other}
    />
  );
};

SnackbarVariantContent.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
};

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