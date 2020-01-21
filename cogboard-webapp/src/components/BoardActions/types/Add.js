import React from 'react';
import { Add as AddIcon } from '@material-ui/icons';
import { useDispatch } from 'react-redux';

import { useToggle } from '../../../hooks';
import { loadSettings } from '../../../actions/thunks';

import { StyledActionButton } from '../styled';

import AppDialog from '../../AppDialog';
import AddWidget from '../../AddWidget';

const Add = props => {
  const {
    config: { ariaLabel, color, cypressData }
  } = props;

  const dispatch = useDispatch();
  const [dialogOpened, openDialog, handleDialogClose] = useToggle();

  const handleAddWidgetClick = () => {
    dispatch(loadSettings());
    openDialog(true);
  };

  return (
    <React.Fragment>
      <StyledActionButton
        aria-label={ariaLabel}
        color={color}
        data-cy={cypressData}
        onClick={handleAddWidgetClick}
      >
        <AddIcon />
      </StyledActionButton>
      <AppDialog
        disableBackdropClick={true}
        handleDialogClose={handleDialogClose}
        open={dialogOpened}
        title="Add new widget"
        data-cy="main-template-add-widget-dialog"
      >
        <AddWidget closeDialog={handleDialogClose} />
      </AppDialog>
    </React.Fragment>
  );
};

export default Add;
