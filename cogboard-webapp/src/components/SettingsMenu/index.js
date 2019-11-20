import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useToggle } from '../../hooks';
import {
  getIsAuthenticated,
  getCredentials,
  getEndpoints
} from '../../selectors';

import {
  Button,
  Tab,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@material-ui/core';
import { Build } from '@material-ui/icons';
import AppDialog from '../AppDialog';
import { StyledTabs, StyledTabPanel } from './styled';
import AddEndpoint from '../AddEndpoint';
import AddCredential from '../AddCredential';
import EditEndpoint from '../EditEndpoint';
import EditCredential from '../EditCredential';
import DeleteEnpoint from '../DeleteEndpoint';
import DeleteCredential from '../DeleteCredential';
import { loadSettings } from '../../actions/thunks';

const SettingsMenu = () => {
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState(0);
  const [dialogOpened, openDialog, handleDialogClose] = useToggle();
  const isAuthenticated = useSelector(getIsAuthenticated);
  const credentials = useSelector(getCredentials);
  const endpoints = useSelector(getEndpoints);

  const handleDialogOpen = () => {
    dispatch(loadSettings());
    openDialog();
  };

  const handleTabChange = (_, newValue) => {
    setTabValue(newValue);
  };

  const mapToListItem = (items, EditComponent, DeleteComponent) =>
    items.map(({ id, label }) => (
      <ListItem key={id}>
        <ListItemText primary={label} />
        <ListItemSecondaryAction>
          <EditComponent id={id} />
          <DeleteComponent id={id} label={label} />
        </ListItemSecondaryAction>
      </ListItem>
    ));

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <IconButton
        onClick={handleDialogOpen}
        color="inherit"
        edge="start"
        data-cy="settings-menu-open-button"
      >
        <Build />
      </IconButton>
      <AppDialog
        disableBackdropClick={true}
        handleDialogClose={handleDialogClose}
        open={dialogOpened}
        title="Settings"
      >
        <div>
          <StyledTabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
          >
            <Tab label="Endpoints" />
            <Tab label="Credientials" />
          </StyledTabs>
          <StyledTabPanel value={tabValue} index={0}>
            <List>{mapToListItem(endpoints, EditEndpoint, DeleteEnpoint)}</List>
            <AddEndpoint largeButton />
          </StyledTabPanel>
          <StyledTabPanel value={tabValue} index={1}>
            <List>
              {' '}
              {mapToListItem(
                credentials,
                EditCredential,
                DeleteCredential
              )}{' '}
            </List>
            <AddCredential largeButton />
          </StyledTabPanel>
          <Button
            onClick={handleDialogClose}
            variant="contained"
            color="secondary"
            data-cy="settings-menu-exit-button"
            fullWidth
          >
            exit
          </Button>
        </div>
      </AppDialog>
    </>
  );
};

export default SettingsMenu;
