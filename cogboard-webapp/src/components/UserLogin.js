import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useFormData, useToggle } from '../hooks';
import { login, logout } from '../actions/thunks';
import { getIsAuthenticated } from '../selectors';

import { Button, IconButton, TextField, Typography } from '@material-ui/core';
import { AccountCircle, PowerSettingsNew } from '@material-ui/icons';
import AppDialog from './AppDialog';
import SnackbarWithVariant from "./SnackbarWithVariant";
import { StyledFieldset } from './styled';

const UserLogin = () => {
  const dispatch = useDispatch();
  const {values, handleChange} = useFormData({username: '', password: ''});
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

  const handleLoginButtonClick = (credentials) => () => {
    dispatch(login(credentials))
  };

  const handleLoginOnEnterPress = (event, credentials) => {
    if (event.key === 'Enter') {
      dispatch(login(credentials))
    }
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
      {!isAuthenticated &&
        <IconButton
          onClick={handleLoginDialogOpen}
          aria-label="Login"
          color="inherit"
          edge="start"
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
            onKeyPress={(ev) => handleLoginOnEnterPress(ev, values)}
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
            onKeyPress={(ev) => handleLoginOnEnterPress(ev, values)}
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