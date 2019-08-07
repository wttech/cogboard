import React from 'react';
import { func, string } from 'prop-types';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled/macro';

import { addNewWidget } from '../actions/thunks';

import Button from '@material-ui/core/Button';
import CancelButton from './CancelButton';
import WidgetForm from './WidgetForm';

const StyledCancelButton = styled(CancelButton)`
  margin-left: 20px;
`;

const AddWidget = ({ closeDialog, currentBoard }) => {
  const dispatch = useDispatch();

  const handleAddClick = (values) => () => {
    dispatch(addNewWidget({ currentBoard, values }));
    closeDialog();
  }

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
  currentBoard: string.isRequired
}

export default AddWidget;