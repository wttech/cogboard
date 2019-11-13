import React from 'react';
import { func } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { addNewWidget } from '../actions/thunks';

import WidgetForm from './WidgetForm';

const AddWidget = ({ closeDialog }) => {
  const currentBoardId = useSelector(({ ui }) => ui.currentBoard);
  const dispatch = useDispatch();

  const handleAddWidget = ( values ) => {
    dispatch(addNewWidget({ currentBoardId, values }));
    closeDialog();
  };

  return (
    <WidgetForm
      handleSubmit={handleAddWidget}
      handleCancel={closeDialog}
    />
  );
};

AddWidget.propTypes = {
  closeDialog: func.isRequired,
};

export default AddWidget;