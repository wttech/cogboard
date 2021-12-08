import React from 'react';
import { useSelector } from 'react-redux';
import { v4 } from 'uuid';
import {
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch
} from '@material-ui/core';
import { StyledExitButton } from './styled';
import { getIsAuthenticated } from '../../../../../../selectors';
import { useToggle } from '../../../../../../hooks';
import { postWidgetContentUpdate } from '../../../../../../utils/fetch';
import AppDialog from '../../../../../AppDialog';
import AddItem from '../../../../../AddItem';
import QuarantineForm from './QuarantineForm';
import EditQFilter from './EditQFilter';
import DeleteItem from '../../../../../DeleteItem';

const QuarantineModal = ({ wid, quarantine }) => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const [dialogOpened, openDialog, handleDialogClose] = useToggle();

  const handleQuarantineClick = event => {
    event.stopPropagation();
    openDialog();
  };

  const addFilter = values => {
    postWidgetContentUpdate({
      id: wid,
      quarantineRules: [...quarantine, { id: v4(), checked: true, ...values }]
    });
  };

  const editFilter = ({ id, values }) => {
    postWidgetContentUpdate({
      id: wid,
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
      id: wid,
      quarantineRules: quarantine.map(filter =>
        filter.id === id ? { ...filter, checked: !filter.checked } : filter
      )
    });
  };

  const deleteAction = id => {
    postWidgetContentUpdate({
      id: wid,
      quarantineRules: quarantine.filter(quarantine => quarantine.id !== id)
    });
  };

  if (!isAuthenticated) {
    return null;
  }

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
          <DeleteItem
            id={id}
            label={label}
            itemName={name}
            deleteAction={deleteAction}
          />
          <Switch
            checked={checked}
            onChange={() => handleSwitchChange(id)}
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
        title="Quarantine management"
      >
        <List>
          {renderListItems(
            quarantine,
            'quarantine',
            EditQFilter,
            editFilter,
            deleteAction
          )}
        </List>
        <AddItem largeButton itemName="quarantine" submitAction={addFilter}>
          <QuarantineForm filters={quarantine} />
        </AddItem>
        <StyledExitButton
          onClick={handleDialogClose}
          variant="contained"
          color="default"
          data-cy="quarantine-menu-exit-button"
          fullWidth
        >
          Exit
        </StyledExitButton>
      </AppDialog>
    </>
  );
};

export default QuarantineModal;
