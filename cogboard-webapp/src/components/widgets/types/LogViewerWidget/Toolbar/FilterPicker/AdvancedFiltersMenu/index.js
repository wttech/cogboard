import React, { useState } from 'react';
import { useToggle } from '../../../../../../../hooks';

import AppDialog from '../../../../../../AppDialog';
import AddItem from '../../../../../../AddItem';
import DeleteItem from '../../../../../../DeleteItem';
import FilterForm from './FilterForm';
import {
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@material-ui/core';

export default function AdvancedFiltersMenu() {
  const [dialogOpened, openDialog, handleDialogClose] = useToggle();

  const [filters, setFilters] = useState([{ id: 'filter1', label: 'filter1' }]);
  const addFilter = filter => {
    setFilters([...filters, filter]);
    console.log('wywołany AddFilter');
  };

  const renderListItems = (items, name, EditComponent, deleteAction) =>
    items.map(({ id, label }) => (
      <ListItem key={id}>
        <ListItemText primary={label} />
        <ListItemSecondaryAction>
          <EditComponent id={id} />
          {/* USES REDUX */}
          {/* <DeleteItem
            id={id}
            label={label}
            itemName={name}
            deleteAction={deleteAction}
          /> */}
        </ListItemSecondaryAction>
      </ListItem>
    ));

  return (
    <>
      <Button variant="contained" size="small" onClick={() => openDialog()}>
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
            () => 'E',
            () => 'D'
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
}
