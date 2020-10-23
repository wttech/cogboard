import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useEventListener, useToggle } from '../../hooks';
import { login, logout } from '../../actions/thunks';
import { clearLoginErrorMessage } from '../../actions/actionCreators';
import { getIsAuthenticated } from '../../selectors';
import { getCredentials } from './helpers';

import { Button, IconButton, TextField, Tooltip } from '@material-ui/core';
import { AccountCircle, Error, PowerSettingsNew } from '@material-ui/icons';
import AppDialog from './../AppDialog';
import { StyledFieldset, StyledErrorMsg, StyledPowerIconButton } from '../styled';

const UserLogin = () => {
  const dispatch = useDispatch();
  const errorMsg = useSelector(({ app }) => app.loginErrorMessage);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const [dialogOpened, openDialog, handleDialogClose] = useToggle();

  useEffect(() => {
    if (isAuthenticated) {
      handleDialogClose();
    }
  }, [isAuthenticated, handleDialogClose]);

  const handleLoginButtonClick = () => {
    const credentials = getCredentials();
    dispatch(login(credentials));
  };

  const handleLoginOnEnterPress = event => {
    if (event.key === 'Enter') {
      handleLoginButtonClick();
    }
  };

  const handleLoginDialogOpen = () => {
    openDialog(true);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  function closeDialog() {
    handleDialogClose();
    dispatch(clearLoginErrorMessage());
  }

  useEventListener('sucessPasswordChange', handleLoginDialogOpen);

  return (
    <>
      {!isAuthenticated && (
        <Tooltip title="Login" placement="bottom-end">
          <IconButton
            onClick={handleLoginDialogOpen}
            aria-label="Login"
            color="primary"
            edge="start"
            data-cy="user-login-login-icon"
          >
            <AccountCircle color="primary" />
          </IconButton>
        </Tooltip>
      )}
      {isAuthenticated && (
        <Tooltip title="Logout" placement="bottom-end">
          <StyledPowerIconButton
            onClick={handleLogout}
            aria-label="Logout"
            color="primary"
            edge="start"
            data-cy="user-login-logout-icon"
          >
            <PowerSettingsNew />
          </StyledPowerIconButton>
        </Tooltip>
      )}
      <AppDialog
        handleDialogClose={closeDialog}
        open={dialogOpened}
        title="User Login"
      >
        <StyledFieldset component="fieldset">
          {errorMsg && (
            <StyledErrorMsg color="error" data-cy="user-login-error-messages">
              <Error />
              {errorMsg}
            </StyledErrorMsg>
          )}
          <TextField
            autoFocus
            id="username"
            InputLabelProps={{
              shrink: true
            }}
            label="Username"
            margin="normal"
            onKeyPress={handleLoginOnEnterPress}
            inputProps={{ 'data-cy': 'user-login-username-input' }}
          />
          <TextField
            id="password"
            InputLabelProps={{
              shrink: true
            }}
            type="password"
            label="Password"
            margin="normal"
            onKeyPress={handleLoginOnEnterPress}
            inputProps={{ 'data-cy': 'user-login-password-input' }}
          />
        </StyledFieldset>
        <Button
          color="secondary"
          onClick={handleLoginButtonClick}
          variant="contained"
          data-cy="user-login-submit-button"
        >
          Login
        </Button>
      </AppDialog>
    </>
  );
};

export default UserLogin;
