import React from 'react';
import { func } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled/macro';

import { addNewWidget } from '../actions/thunks';

import Button from '@material-ui/core/Button';
import CancelButton from './CancelButton';
import WidgetForm from './WidgetForm';

const StyledCancelButton = styled(CancelButton)`
  margin-left: 20px;
`;

const AddWidget = ({ closeDialog }) => {
  const currentBoardId = useSelector(({ ui }) => ui.currentBoard);
  const dispatch = useDispatch();

  const handleAddWidget = (values) => {
    dispatch(addNewWidget({ currentBoardId, values }));
    closeDialog();
  };

  return (
    <WidgetForm
      handleSubmit={handleAddWidget}
      renderActions={() =>
        <>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            data-cy="widget-form-submit-button"
          >
            Add
          </Button>
          <StyledCancelButton 
            handleCancelClick={closeDialog} 
            data-cy="widget-form-cancel-button"
          />
        </>
      }
    />
  );
};

AddWidget.propTypes = {
  closeDialog: func.isRequired,
};

export default AddWidget;