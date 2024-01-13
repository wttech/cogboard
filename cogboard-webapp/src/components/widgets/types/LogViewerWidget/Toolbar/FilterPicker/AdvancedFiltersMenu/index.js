import React, { useEffect, useContext } from 'react';
import { useToggle } from '../../../../../../../hooks';
import { v4 } from 'uuid';
import { getFilters, saveFilters } from '../helpers';
import QuarantineModal from '../../QuarantineModal';
import ToggleIconButton from '../../ToggleIconButton';

import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  Tooltip
} from '@material-ui/core';
import AdvancedIcon from '@material-ui/icons/FilterList';
import AppDialog from '../../../../../../AppDialog';
import AddItem from '../../../../../../AddItem';
import EditFilter from './EditFilter';
import DeleteItem from '../../../../../../DeleteItem';
import FilterForm from './FilterForm';
import { StyledExitButton } from './styled';
import LogsViewerContext from '../../../context';

const AdvancedFiltersMenu = ({ widgetLocalStorage, quarantine }) => {
  const [dialogOpened, openDialog, handleDialogClose] = useToggle();

  const logsViewerContect = useContext(LogsViewerContext);

  useEffect(() => {
    if (logsViewerContect.filter || logsViewerContect.quarantine) {
      openDialog();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logsViewerContect.filter, logsViewerContect.quarantine]);

  const filters = getFilters(widgetLocalStorage);

  const addFilter = values => {
    saveFilters(widgetLocalStorage, [
      ...filters,
      { id: `filter-${v4()}`, checked: true, ...values }
    ]);
  };

  const editFilter = ({ id, values }) => {
    saveFilters(
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
    saveFilters(
      widgetLocalStorage,
      filters.filter(filter => filter.id !== id)
    );
  };

  const handleSwitch = id =>
    saveFilters(
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
    items.map(({ id, label, checked, regExp }) => (
      <ListItem key={id}>
        <Tooltip
          title={`Regular expression: ${regExp}`}
          placement="bottom-start"
        >
          <ListItemText primary={label} />
        </Tooltip>
        <ListItemSecondaryAction>
          <EditComponent id={id} filters={items} editAction={editAction} />
          <DeleteItem
            id={id}
            label={label}
            itemName={name}
            deleteAction={deleteAction}
          />
          <Tooltip
            title={`Filter status: ${checked ? 'ON' : 'OFF'}`}
            placement="bottom"
          >
            <Switch
              checked={checked}
              onChange={() => handleSwitch(id)}
              color="secondary"
            />
          </Tooltip>
        </ListItemSecondaryAction>
      </ListItem>
    ));

  return (
    <>
      <ToggleIconButton
        tooltip="Advanced"
        enabled={dialogOpened}
        onClick={openDialog}
        Icon={AdvancedIcon}
        data-cy="advanced-filters-button"
      />
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
        <AddItem
          largeButton
          itemName="filter"
          submitAction={addFilter}
          shouldOpen={logsViewerContect.filter}
        >
          <FilterForm filters={filters} />
        </AddItem>
        <QuarantineModal quarantine={quarantine} />
        <StyledExitButton
          onClick={handleDialogClose}
          variant="contained"
          color="default"
          data-cy="advanced-filters-menu-exit-button"
          fullWidth
        >
          exit
        </StyledExitButton>
      </AppDialog>
    </>
  );
};

export default AdvancedFiltersMenu;
