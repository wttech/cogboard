import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, IconButton, TextField, Typography } from '@material-ui/core';
import {AccountCircle, PowerSettingsNew} from '@material-ui/icons';

import { useDialogToggle, useFormData, useSnackbarToggle } from '../hooks';
import { login, logout } from '../actions/thunks';
import { StyledFieldset } from './styled';
import AppDialog from './AppDialog';
import SnackbarWithVariant from "./SnackbarWithVariant";

const UserLogin = () => {
  const dispatch = useDispatch();
  const { values, handleChange } = useFormData({ username: '', password: ''});
  const [dialogOpened, openDialog, handleDialogClose] = useDialogToggle();
  const errorMsg = useSelector(({app}) => app.loginErrorMessage);
  const jwToken = useSelector(({app}) => app.jwToken);
  const [loginSnackbar, openLoginSnackbar, handleLoginSnackbarClose] = useSnackbarToggle();
  const [logoutSnackbar, openLogoutSnackbar, handleLogoutSnackbarClose] = useSnackbarToggle();

  const handleLoginButtonClick = (credentials) => () => {
    dispatch(login(credentials));
    handleDialogClose();
    openLoginSnackbar();
  };

  const handleLoginDialogOpen = () => {
    openDialog(true);
  };

  const handleLogout = () => {
    dispatch(logout());
    openLogoutSnackbar();
  };

  return (
    <>
      {!jwToken &&
        <IconButton
          onClick={handleLoginDialogOpen}
          aria-label="Login"
          color="inherit"
          edge="start"
        >
          <AccountCircle/>
        </IconButton>
      }
      {jwToken &&
        <IconButton
          onClick={handleLogout}
          aria-label="Logout"
          color="inherit"
          edge="start"
        >
          <PowerSettingsNew/>
        </IconButton>
      }
      <AppDialog
        handleDialogClose={handleDialogClose}
        open={dialogOpened}
        title='User Login'>
        <StyledFieldset component="fieldset">
          {errorMsg &&
          <Typography color="error">
            {errorMsg}
          </Typography>}
          <TextField
            onChange={handleChange('username')}
            id="username"
            InputLabelProps={{
              shrink: true
            }}
            label="Username"
            margin="normal"
            value={values.username}
          />
          <TextField
            onChange={handleChange('password')}
            id="password"
            InputLabelProps={{
              shrink: true
            }}
            type="password"
            label="Password"
            margin="normal"
            value={values.password}
          />
          <Button
            color="primary"
            onClick={handleLoginButtonClick(values)}
            variant="contained">
            Login
          </Button>
        </StyledFieldset>
      </AppDialog>
      <SnackbarWithVariant
        open={loginSnackbar.open}
        handleClose={handleLoginSnackbarClose}
        hideAfter={3000}
        message={`Logged in as ${values.username}`}
        vertical={'top'}
        horizontal={'center'}
        variant={'success'}
      />
      <SnackbarWithVariant
        open={logoutSnackbar.open}
        handleClose={handleLogoutSnackbarClose}
        hideAfter={3000}
        message={`${values.username} was logged out successfully`}
        vertical={'top'}
        horizontal={'center'}
        variant={'info'}
      />
    </>
  );
};

export default UserLogin;