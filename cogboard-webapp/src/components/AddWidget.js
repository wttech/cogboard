import React from 'react';
import {func} from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import Button from '@material-ui/core/Button';

import {addNewWidget} from '../actions/thunks';
import WidgetForm from './WidgetForm';
import {StyledCancelButton} from "./styled";

const AddWidget = ({ closeDialog }) => {
  const currentBoardId = useSelector(({ ui }) => ui.currentBoard);
  const dispatch = useDispatch();

  const handleAddClick = (values) => () => {
    dispatch(addNewWidget({ currentBoardId, values }));
    closeDialog();
  };

  return (
    <WidgetForm
      renderActions={values =>
        <>
          <Button
            onClick={handleAddClick(values)}
            color="primary"
            variant="contained"
          >
            Add
          </Button>
          <StyledCancelButton handleCancelClick={closeDialog} />
        </>
      }
    />
  );
};

AddWidget.propTypes = {
  closeDialog: func.isRequired,
};

export default AddWidget;