import React from 'react';

import { useToggle } from '../../../../../../../hooks';

import { IconButton, Tooltip } from '@material-ui/core';
import { Build } from '@material-ui/icons';
import AppDialog from '../../../../../../AppDialog';
import FilterForm from './FilterForm';

const EditFilter = ({ id, filters, editAction }) => {
  const [dialogOpened, openDialog, handleDialogClose] = useToggle();
  const filterData = filters.find(filter => filter.id === id);

  const handleSubmit = values => {
    editAction({ id, values });
    handleDialogClose();
  };

  return (
    <>
      <Tooltip title="Edit" placement="bottom">
        <IconButton onClick={openDialog} data-cy="edit-filter-edit-button">
          <Build />
        </IconButton>
      </Tooltip>
      <AppDialog
        disableBackdropClick={true}
        handleDialogClose={handleDialogClose}
        open={dialogOpened}
        title="Edit filter"
      >
        {filterData && (
          <FilterForm
            onSubmit={handleSubmit}
            handleCancel={handleDialogClose}
            id={id}
            filters={filters}
            {...filterData}
          />
        )}
      </AppDialog>
    </>
  );
};

export default EditFilter;
