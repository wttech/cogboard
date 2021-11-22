import React from 'react';
import { useSelector } from 'react-redux';

import {
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch
} from '@material-ui/core';
import { getIsAuthenticated } from '../../../../../../selectors';
import { useToggle } from '../../../../../../hooks';
import AppDialog from '../../../../../AppDialog';
import AddItem from '../../../../../AddItem';
import QuarantineForm from './QuarantineForm';
import EditQFilter from './EditQFilter';
import { postWidgetContentUpdate } from '../../../../../../utils/fetch';

const QuarantineModal = ({ wid, quarantine }) => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const [dialogOpened, openDialog, handleDialogClose] = useToggle();

  const handleQuarantineClick = event => {
    event.stopPropagation();
    openDialog();
  };

  const addFilter = values => {
    const maxId = quarantine.reduce((acc, { id }) => (id > acc ? id : acc), 0);
    postWidgetContentUpdate({
      wid,
      quarantineRules: [
        ...quarantine,
        { id: maxId + 1, checked: true, ...values }
      ]
    });
  };

  const editFilter = ({ id, values }) => {
    postWidgetContentUpdate({
      wid,
      quarantineRules: quarantine.map(filter => {
        if (filter.id === id) {
          return { id, ...values };
        }
        return filter;
      })
    });
  };

  const handleSwitchChange = id => {
    postWidgetContentUpdate({
      wid,
      quarantineRules: quarantine.map(filter =>
        filter.id === id ? { ...filter, checked: !filter.checked } : filter
      )
    });
  };

  const deleteItem = id => {
    postWidgetContentUpdate({
      wid,
      quarantineRules: quarantine.filter(quarantine => filter.id !== id)
    });
  };

  if (!isAuthenticated) {
    return null;
  }

  console.log(quarantine);
  const renderListItems = (
    items,
    name,
    EditComponent,
    editAction,
    deleteAction
  ) =>
    items.map(({ id, label, checked, reasonField }) => (
      <ListItem key={id}>
        <ListItemText primary={label} />
        <ListItemText primary={reasonField} />
        <ListItemSecondaryAction>
          <EditComponent id={id} filters={items} editAction={editAction} />
          {/* <DeleteItem
          id={id}
          label={label}
          itemName={name}
          deleteAction={deleteAction}
         /> */}
          <Switch
            checked={checked}
            onChange={handleSwitchChange(id)}
            color="secondary"
          ></Switch>
        </ListItemSecondaryAction>
      </ListItem>
    ));

  return (
    <>
      <Button variant="contained" size="small" onClick={handleQuarantineClick}>
        Quarantine
      </Button>
      <AppDialog
        disableBackdropClick={true}
        handleDialogClose={handleDialogClose}
        open={dialogOpened}
        title="Manage a quarantine"
      >
        <List>
          {renderListItems(
            quarantine,
            'quarantine',
            EditQFilter,
            editFilter,
            () => null
          )}
        </List>
        <Button
          onClick={handleDialogClose}
          variant="contained"
          color="default"
          data-cy="quarantine-menu-exit-button"
          fullWidth
        >
          Exit
        </Button>
        <AddItem largeButton itemName="quarantine" submitAction={addFilter}>
          <QuarantineForm filters={quarantine} />
        </AddItem>
      </AppDialog>
    </>
  );
};

export default QuarantineModal;
