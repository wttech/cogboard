import React, { cloneElement } from 'react';

import { useToggle } from '../hooks';

import AddButton from './AddButton';
import AppDialog from './AppDialog';

const AddItem = ({ itemName, largeButton, submitAction, children }) => {
  const [dialogOpened, openDialog, handleDialogClose] = useToggle();

  const handleAddItemClick = event => {
    event.stopPropagation();
    openDialog();
  };

  const handleSubmit = values => {
    submitAction(values);
    handleDialogClose();
  };

  return (
    <>
      <AddButton
        color="primary"
        onClick={handleAddItemClick}
        data-cy={`add-${itemName}-add-button`}
        largeButton={largeButton}
      >
        {`Add ${itemName}`}
      </AddButton>
      <AppDialog
        disableBackdropClick={true}
        handleDialogClose={handleDialogClose}
        open={dialogOpened}
        title={`Add new ${itemName}`}
      >
        {cloneElement(children, {
          onSubmit: handleSubmit,
          handleCancel: handleDialogClose
        })}
      </AppDialog>
    </>
  );
};

export default AddItem;
