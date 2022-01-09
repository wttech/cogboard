import React, { useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import { v4 } from 'uuid';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  Tooltip
} from '@material-ui/core';
import { StyledButton } from './styled';
import { getIsAuthenticated } from '../../../../../../selectors';
import { useToggle } from '../../../../../../hooks';
import { postWidgetContentUpdate } from '../../../../../../utils/fetch';
import AppDialog from '../../../../../AppDialog';
import AddItem from '../../../../../AddItem';
import QuarantineForm from './QuarantineForm';
import EditQFilter from './EditQFilter';
import DeleteItem from '../../../../../DeleteItem';
import { SimilarLogsContext } from '../../context';

const QuarantineModal = ({ wid, quarantine }) => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const [dialogOpened, openDialog, handleDialogClose] = useToggle();

  const similarLogs = useContext(SimilarLogsContext);

  useEffect(() => {
    if (similarLogs.quarantine) {
      openDialog();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [similarLogs.quarantine]);

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
        <Tooltip title={`Reason: ${reasonField}`} placement="bottom-start">
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
      <StyledButton
        variant="contained"
        fullWidth
        onClick={handleQuarantineClick}
        data-cy="quarantine-show-dialog-button"
      >
        Quarantine
      </StyledButton>
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
        <AddItem
          largeButton
          itemName="quarantine"
          submitAction={addFilter}
          shouldOpen={similarLogs.quarantine}
        >
          <QuarantineForm filters={quarantine} />
        </AddItem>
        <StyledButton
          onClick={handleDialogClose}
          variant="contained"
          color="default"
          data-cy="quarantine-menu-exit-button"
          fullWidth
        >
          Exit
        </StyledButton>
      </AppDialog>
    </>
  );
};

export default QuarantineModal;
