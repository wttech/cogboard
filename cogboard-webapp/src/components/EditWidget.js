import React from 'react';
import { func, object, string, bool, number } from 'prop-types';
import { useDispatch } from 'react-redux';

import { saveWidget } from '../actions/thunks';

import WidgetForm from './WidgetForm';

const EditWidget = ({ closeDialog, id, widgetTypeData, ...widgetData }) => {
  const initialFormValues = { ...widgetData, ...widgetTypeData };
  const dispatch = useDispatch();

  const handleEditWidget = ( values ) => {
    dispatch(saveWidget({ id, values }));
    closeDialog();
  };

  return (
    <WidgetForm
      handleSubmit={handleEditWidget}
      handleCancel={closeDialog}
      {...initialFormValues}
    />
  );
};

EditWidget.propTypes = {
  closeDialog: func.isRequired,
  disabled: bool.isRequired,
  columns: number.isRequired,
  goNewLine: bool.isRequired,
  id: string.isRequired,
  rows: number.isRequired,
  title: string.isRequired,
  type: string.isRequired,
  widgetTypeData: object.isRequired
};

export default EditWidget;
