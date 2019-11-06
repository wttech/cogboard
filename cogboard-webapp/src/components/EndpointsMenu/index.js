import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { useToggle } from '../../hooks';
import { getIsAuthenticated } from '../../selectors';

import { Tab, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import { Build, Delete } from '@material-ui/icons';
import AppDialog from '../AppDialog';
import { StyledButton, StyledTabs, StyledTabPanel } from './styled';

export const EndpointsMenu = (props) => {
  const [tabValue, setTabValue] = useState(0);
  const [dialogOpened, openDialog, handleDialogClose] = useToggle();
  const isAuthenticated = useSelector(getIsAuthenticated);

  const endpoints = [{id: 'endpoint_1', title: "Endpoint 1"}, {id: 'endpoint_2', title: "Endpoint 2"}, {id: 'endpoint_3', title: "Endpoint 3"}]
  const credientials = [{id: 'credientials_1', title: "Credientials 1"}, {id: 'credientials_2', title: "Credientials 2"}, {id: 'credientials_3', title: "Credientials 3"}]

  const handleDialogOpen = (event) => {
    event.stopPropagation();
    openDialog();
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const mapToListItems = (items) => {

    return items.map(endpoint => {
      const { id, title } = endpoint

      return (
        <ListItem key={id}>
          <ListItemText
            primary={title}
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="build">
              <Build />
            </IconButton>
            <IconButton edge="end" aria-label="delete">
              <Delete />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      );
      }
    )
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <IconButton
        onClick={handleDialogOpen}
        color="inherit"
        edge="start"
        data-cy="open-endpoints-menu-button">
        <Build />
      </IconButton>
      <AppDialog
        disableBackdropClick={true}
        handleDialogClose={handleDialogClose}
        open={dialogOpened}
        title="Endpoints menu"
      > 
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
            {mapToListItems(endpoints)}
          </List>
          <StyledButton variant="outlined">
            Add endpoint
          </StyledButton>
        </StyledTabPanel>
        <StyledTabPanel value={tabValue} index={1}>
          <List>
            {mapToListItems(credientials)}
          </List>
          <StyledButton variant="outlined">
            Add credientials
          </StyledButton>
        </StyledTabPanel>
      </AppDialog>
    </>
  )
}