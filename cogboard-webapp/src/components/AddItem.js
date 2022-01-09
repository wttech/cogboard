import React, { cloneElement, useEffect } from 'react';

import { useToggle } from '../hooks';
import AddButton from './AddButton';
import AppDialog from './AppDialog';

const AddItem = ({
  itemName,
  largeButton,
  submitAction,
  children,
  shouldOpen
}) => {
  const [dialogOpened, openDialog, handleDialogClose] = useToggle();

  useEffect(() => {
    if (shouldOpen) {
      openDialog();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldOpen]);

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
        color="secondary"
        onClick={handleAddItemClick}
        data-cy={`add-${itemName}-add-button${!largeButton ? '-small' : ''}`}
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
