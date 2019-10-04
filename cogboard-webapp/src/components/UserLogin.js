import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useToggle } from '../hooks';
import { login, logout } from '../actions/thunks';
import { clearLoginErrorMessage } from "../actions/actionCreators";
import { getIsAuthenticated } from '../selectors';

import { Button, IconButton, TextField, Typography } from '@material-ui/core';
import { AccountCircle, PowerSettingsNew } from '@material-ui/icons';
import AppDialog from './AppDialog';
import SnackbarWithVariant from "./SnackbarWithVariant";
import { StyledFieldset } from './styled';

const UserLogin = () => {
  const dispatch = useDispatch();
  const errorMsg = useSelector(({app}) => app.loginErrorMessage);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const [dialogOpened, openDialog, handleDialogClose] = useToggle();
  const [loginSnackbarOpened, openLoginSnackbar, handleLoginSnackbarClose] = useToggle();
  const [logoutSnackbarOpened, openLogoutSnackbar, handleLogoutSnackbarClose] = useToggle();

  useEffect(() => {
    if(isAuthenticated) {
      handleDialogClose();
      openLoginSnackbar();
    }
  }, [isAuthenticated, handleDialogClose, openLoginSnackbar]);

  const handleLoginButtonClick = () => {
    const credentials = getCredentials();
    dispatch(login(credentials))
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
    openLogoutSnackbar();
  };

  const getCredentials = () => {
    const usernameField = document.getElementById("username");
    const passwordField = document.getElementById("password");
    return {
      username: usernameField ? usernameField.value : "",
      password: passwordField ? passwordField.value : "",
    };
  };

  function closeDialog() {
    handleDialogClose();
    dispatch(clearLoginErrorMessage());
  }

  return (
    <>
      {!isAuthenticated &&
        <IconButton
          onClick={handleLoginDialogOpen}
          aria-label="Login"
          color="inherit"
          edge="start"
          data-cy="user-login-login-icon"
        >
          <AccountCircle/>
        </IconButton>
      }
      {isAuthenticated &&
        <IconButton
          onClick={handleLogout}
          aria-label="Logout"
          color="inherit"
          edge="start"
          data-cy="user-login-logout-icon"
        >
          <PowerSettingsNew/>
        </IconButton>
      }
      <AppDialog
        handleDialogClose={closeDialog}
        open={dialogOpened}
        title='User Login'>
        <StyledFieldset component="fieldset">
          {errorMsg &&
          <Typography color="error">
            {errorMsg}
          </Typography>}
          <TextField
            id="username"
            InputLabelProps={{
              shrink: true
            }}
            label="Username"
            margin="normal"
            onKeyPress={handleLoginOnEnterPress}
            inputProps={{'data-cy': 'user-login-username-input'}}
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
            inputProps={{'data-cy': 'user-login-password-input'}}
          />
          <Button
            color="primary"
            onClick={handleLoginButtonClick}
            variant="contained"
            data-cy='user-login-submit-button'>
            Login
          </Button>
        </StyledFieldset>
      </AppDialog>
      <SnackbarWithVariant
        open={loginSnackbarOpened}
        handleClose={handleLoginSnackbarClose}
        hideAfter={3000}
        message={`Logged in as ${getCredentials().username}`}
        vertical="top"
        horizontal="center"
        variant="success"
      />
      <SnackbarWithVariant
        open={logoutSnackbarOpened}
        handleClose={handleLogoutSnackbarClose}
        hideAfter={3000}
        message={`Logged out successfully`}
        vertical="top"
        horizontal="center"
        variant="info"
      />
    </>
  );
};

export default UserLogin;