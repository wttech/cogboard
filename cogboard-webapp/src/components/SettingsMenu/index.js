import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useToggle } from '../../hooks';
import { getIsAuthenticated } from '../../selectors';

import { Button, Tab, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import { Build } from '@material-ui/icons';
import AppDialog from '../AppDialog';
import { StyledTabs, StyledTabPanel } from './styled';
import AddEndpoint from '../AddEndpoint';
import AddCredential from '../AddCredential';
import EditEndpoint from '../EditEndpoint';
import EditCredential from '../EditCredential';
import DeleteEnpoint from '../DeleteEndpoint';
import DeleteCredential from '../DeleteCredential';

const SettingsMenu = () => {
  const [tabValue, setTabValue] = useState(0);
  const [needFetchData, setNeedFetchData] = useState(true);
  const [dialogOpened, openDialog, handleDialogClose] = useToggle();
  const isAuthenticated = useSelector(getIsAuthenticated);

  const endpoints = [{id: 'endpoint_1', title: "Endpoint 1"}, {id: 'endpoint_2', title: "Endpoint 2"}, {id: 'endpoint_3', title: "Endpoint 3"}];
  const credentials = [{id: 'credentials_1', title: "Credentials 1"}, {id: 'credentials_2', title: "Credentials 2"}, {id: 'credentials_3', title: "Credentials 3"}];

  useEffect(() => {
    if (needFetchData) {
      console.log('Fetch enpoints data');
      setNeedFetchData(false)
    }
  }, [needFetchData])

  const handleDialogOpen = (event) => {
    event.stopPropagation();
    openDialog();
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleDataChanged = () => {
    setNeedFetchData(true);
  }

  const mapToListItem = (items, EditComponent, DeleteComponent) => (
    items.map(({ id, title }) => (
      <ListItem key={id}>
        <ListItemText primary={title} />
        <ListItemSecondaryAction>
          <EditComponent id={id} label={title} dataChanged={handleDataChanged} />
          <DeleteComponent id={id} label={title} dataChanged={handleDataChanged} />
        </ListItemSecondaryAction>
      </ListItem>
    ))
  );

  if (!isAuthenticated) {
    return null;
  };

  return (
    <>
      <IconButton
        onClick={handleDialogOpen}
        color="inherit"
        edge="start"
        data-cy="settings-menu-open-button">
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
            <Tab label="Endpoints"/>
            <Tab label="Credientials"/>
          </StyledTabs>
          <StyledTabPanel value={tabValue} index={0}>
            <List>
              {mapToListItem(endpoints, EditEndpoint, DeleteEnpoint)}
            </List>
            <AddEndpoint largeButton dataChanged={handleDataChanged}/>
          </StyledTabPanel>
          <StyledTabPanel value={tabValue} index={1}>
            <List>
              {mapToListItem(credentials, EditCredential, DeleteCredential)}
            </List>
            <AddCredential largeButton dataChanged={handleDataChanged}/>
          </StyledTabPanel>
          <Button 
            onClick={handleDialogClose}
            variant="contained"
            color="secondary"
            data-cy="settings-menu-exit-button"
            fullWidth>
            exit
          </Button>
        </div>
      </AppDialog>
    </>
  )
}

export default SettingsMenu;