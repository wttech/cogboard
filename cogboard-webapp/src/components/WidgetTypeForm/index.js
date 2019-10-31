import React from 'react';
import { func, object, string } from 'prop-types';

import widgetTypes from '../widgets';

import DynamicForm from '../DynamicForm';

const WidgetTypeForm = ({ values, type, handleChange, errors, ...other }) => {
  const widgetType = widgetTypes[type];
  const dialogFieldNames = (widgetType && widgetType.dialogFields) ? widgetType.dialogFields : [];
  const hasDialogFields = dialogFieldNames.length !== 0;

  return hasDialogFields && (
    <DynamicForm
      values={values}
      handleChange={handleChange}
      fields={dialogFieldNames}
      errors={errors}
      {...other}
    />
  );
};

WidgetTypeForm.propTypes = {
  handleChange: func.isRequired,
  type: string.isRequired,
  values: object.isRequired
};

export default WidgetTypeForm;