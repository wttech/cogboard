import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useDialogToggle, useFormData } from '../hooks';
import { login, logout } from '../actions/thunks';

import { TextField, Button, IconButton, Typography } from '@material-ui/core';
import { AccountCircle, PowerSettingsNew } from '@material-ui/icons';
import { StyledFieldset } from './styled';
import AppDialog from './AppDialog';

const UserLogin = () => {
  const dispatch = useDispatch();
  const { values, handleChange } = useFormData({ username: '', password: ''});
  const [dialogOpened, openDialog, handleDialogClose] = useDialogToggle();
  const errorMsg = useSelector(({app}) => app.loginErrorMessage);
  const jwToken = useSelector(({app}) => app.jwToken);

  const handleLoginButtonClick = (credentials) => () => {
    dispatch(login(credentials))
  };

  const handleLoginDialogOpen = () => {
    openDialog(true);
  };

  const handleLogout = () => {
    dispatch(logout())
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
    </>
  );
};

export default UserLogin;