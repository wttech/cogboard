import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, IconButton, TextField, Typography } from '@material-ui/core';
import { AccountCircle, PowerSettingsNew } from '@material-ui/icons';

import { useFormData, useToggle } from '../hooks';
import { login, logout } from '../actions/thunks';
import { StyledFieldset } from './styled';
import AppDialog from './AppDialog';
import SnackbarWithVariant from "./SnackbarWithVariant";

const UserLogin = () => {
  const dispatch = useDispatch();
  const {values, handleChange} = useFormData({username: '', password: ''});
  const errorMsg = useSelector(({app}) => app.loginErrorMessage);
  const jwToken = useSelector(({app}) => app.jwToken);
  const isUserLogged = !!jwToken;
  const [dialogOpened, openDialog, handleDialogClose] = useToggle();
  const [loginSnackbarOpened, openLoginSnackbar, handleLoginSnackbarClose] = useToggle();
  const [logoutSnackbarOpened, openLogoutSnackbar, handleLogoutSnackbarClose] = useToggle();
  const onLoginButtonClick = () => {
    if(isUserLogged) {
      handleDialogClose();
      openLoginSnackbar();
    }
  };

  useEffect(onLoginButtonClick, [isUserLogged]);

  const handleLoginButtonClick = (credentials) => () => {
    dispatch(login(credentials))
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
        open={loginSnackbarOpened}
        handleClose={handleLoginSnackbarClose}
        hideAfter={3000}
        message={`Logged in as ${values.username}`}
        vertical="top"
        horizontal="center"
        variant="success"
      />
      <SnackbarWithVariant
        open={logoutSnackbarOpened}
        handleClose={handleLogoutSnackbarClose}
        hideAfter={3000}
        message={`${values.username} was logged out successfully`}
        vertical="top"
        horizontal="center"
        variant="info"
      />
    </>
  );
};

export default UserLogin;