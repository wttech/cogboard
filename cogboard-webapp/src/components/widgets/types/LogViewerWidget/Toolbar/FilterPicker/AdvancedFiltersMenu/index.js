import React from 'react';
import { useToggle } from '../../../../../../../hooks';
import { setFilters } from '../helpers';

import {
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch
} from '@material-ui/core';
import AppDialog from '../../../../../../AppDialog';
import AddItem from '../../../../../../AddItem';
import EditFilter from './EditFilter';
import DeleteItem from '../../../../../../DeleteItem';
import FilterForm from './FilterForm';

const AdvancedFiltersMenu = ({ widgetLocalStorage }) => {
  const [dialogOpened, openDialog, handleDialogClose] = useToggle();
  const filters = widgetLocalStorage.get()?.regExpFilters || [];

  const addFilter = values => {
    const maxId = filters.reduce((acc, { id }) => (id > acc ? id : acc), 0);
    setFilters(widgetLocalStorage, [
      ...filters,
      { id: maxId + 1, checked: true, ...values }
    ]);
  };

  const editFilter = ({ id, values }) => {
    setFilters(
      widgetLocalStorage,
      filters.map(filter => {
        if (filter.id === id) {
          return { id, checked: true, ...values };
        }
        return filter;
      })
    );
  };

  const deleteFilter = id => {
    setFilters(
      widgetLocalStorage,
      filters.filter(filter => filter.id !== id)
    );
  };

  const handleSwitch = id =>
    setFilters(
      widgetLocalStorage,
      filters.map(filter =>
        filter.id === id ? { ...filter, checked: !filter.checked } : filter
      )
    );

  const renderListItems = (
    items,
    name,
    EditComponent,
    editAction,
    deleteAction
  ) =>
    items.map(({ id, label, checked }) => (
      <ListItem key={id}>
        <ListItemText primary={label} />
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
            onChange={() => handleSwitch(id)}
            color="secondary"
          />
        </ListItemSecondaryAction>
      </ListItem>
    ));

  return (
    <>
      <Button variant="contained" size="small" onClick={openDialog}>
        Advanced
      </Button>
      <AppDialog
        disableBackdropClick={true}
        handleDialogClose={handleDialogClose}
        open={dialogOpened}
        title="Advanced filters"
      >
        <List>
          {renderListItems(
            filters,
            'filter',
            EditFilter,
            editFilter,
            deleteFilter
          )}
        </List>
        <AddItem largeButton itemName="filter" submitAction={addFilter}>
          <FilterForm filters={filters} />
        </AddItem>
        <Button
          onClick={handleDialogClose}
          variant="contained"
          color="default"
          data-cy="advanced-filters-menu-exit-button"
          fullWidth
        >
          exit
        </Button>
      </AppDialog>
    </>
  );
};

export default AdvancedFiltersMenu;
