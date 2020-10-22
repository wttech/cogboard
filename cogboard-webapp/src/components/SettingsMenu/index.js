import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useEventListener, useToggle } from '../../hooks';
import {
  getIsAuthenticated,
  getCredentials,
  getEndpoints
} from '../../selectors';
import {
  loadSettings,
  deleteEndpoint,
  deleteCredential,
  addEndpoint,
  addCredential,
  updateUserSettings
} from '../../actions/thunks';
import { getUserRole } from '../../utils/auth';

import {
  Button,
  Tab,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Tooltip
} from '@material-ui/core';
import { Settings } from '@material-ui/icons';
import AppDialog from '../AppDialog';
import { StyledTabPanel, StyledTabs } from './../styled';
import AddItem from '../AddItem';
import EditEndpoint from '../EditEndpoint';
import EditCredential from '../EditCredential';
import DeleteItem from '../DeleteItem';
import EndpointForm from '../EndpointForm';
import CredentialForm from '../CredentialForm';
import UserControlForm from '../UserControlForm';

const SettingsMenu = ({ className }) => {
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState(0);
  const [dialogOpened, openDialog, handleDialogClose] = useToggle();
  const isAuthenticated = useSelector(getIsAuthenticated);
  const credentials = useSelector(getCredentials);
  const endpoints = useSelector(getEndpoints);
  const userRole = getUserRole();

  useEventListener('sucessPasswordChange', handleDialogClose);

  const handleDialogOpen = () => {
    dispatch(loadSettings());
    openDialog();
  };

  const handleTabChange = (_, newValue) => {
    setTabValue(newValue);
  };

  const handleSubmitCredential = values => {
    delete values.passwordConfirmation;

    dispatch(addCredential(values));
  };

  const handleSubmitEndpoint = values => {
    dispatch(addEndpoint(values));
  };

  const handleSubmitUserControlForm = values => {
    delete values.passwordConfirmation;

    dispatch(updateUserSettings(values));
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
      <Tooltip title="Settings" placement="bottom-end">
        <IconButton
          className={className}
          onClick={handleDialogOpen}
          color="primary"
          edge="start"
          data-cy="settings-menu-open-button"
        >
          <Settings />
        </IconButton>
      </Tooltip>
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
            indicatorColor="primary"
          >
            <Tab label="Endpoints" data-cy="settings-menu-endpoints-tab" />
            <Tab label="Credentials" data-cy="settings-menu-credentials-tab" />
            <Tab
              label="User Control"
              data-cy="settings-menu-user-control-tab"
            />
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
          <StyledTabPanel value={tabValue} index={2}>
            <UserControlForm
              onSubmit={handleSubmitUserControlForm}
              user={userRole}
            />
          </StyledTabPanel>
          <Button
            onClick={handleDialogClose}
            variant="contained"
            color="default"
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
