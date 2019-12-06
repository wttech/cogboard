import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useToggle } from '../../hooks';
import {
  getIsAuthenticated,
  getCredentials,
  getEndpoints
} from '../../selectors';
import {
  loadSettings,
  deleteEndpoint,
  deleteCredential,
  saveCredential,
  saveEndpoint
} from '../../actions/thunks';

import {
  Button,
  Tab,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@material-ui/core';
import { Settings } from '@material-ui/icons';
import AppDialog from '../AppDialog';
import { StyledTabs, StyledTabPanel } from './styled';
import AddItem from '../AddItem';
import EditEndpoint from '../EditEndpoint';
import EditCredential from '../EditCredential';
import DeleteItem from '../DeleteItem';
import EndpointForm from '../EndpointForm';
import CredentialForm from '../CredentialForm';

const SettingsMenu = ({ className }) => {
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

  const handleSubmitCredential = values => {
    delete values.passwordConfirmation;

    dispatch(saveCredential(values));
  };

  const handleSubmitEndpoint = values => {
    dispatch(saveEndpoint(values));
  };

  const renderListItems = (items, name, EditComponent, deleteAction) =>
    items.map(({ id, label }) => (
      <ListItem key={id}>
        <ListItemText primary={label} />
        <ListItemSecondaryAction>
          <EditComponent id={id} />
          <DeleteItem
            id={id}
            label={label}
            itemName={name}
            deleteAction={deleteAction}
          />
        </ListItemSecondaryAction>
      </ListItem>
    ));

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <IconButton
        className={className}
        onClick={handleDialogOpen}
        color="primary"
        edge="start"
        data-cy="settings-menu-open-button"
      >
        <Settings />
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
            <List>
              {renderListItems(
                endpoints,
                'endpoint',
                EditEndpoint,
                deleteEndpoint
              )}
            </List>
            <AddItem
              largeButton
              itemName="endpoint"
              submitAction={handleSubmitEndpoint}
            >
              <EndpointForm />
            </AddItem>
          </StyledTabPanel>
          <StyledTabPanel value={tabValue} index={1}>
            <List>
              {' '}
              {renderListItems(
                credentials,
                'credential',
                EditCredential,
                deleteCredential
              )}{' '}
            </List>
            <AddItem
              largeButton
              itemName="credential"
              submitAction={handleSubmitCredential}
            >
              <CredentialForm />
            </AddItem>
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
