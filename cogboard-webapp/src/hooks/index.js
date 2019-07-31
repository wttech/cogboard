import { useState } from 'react';
import widgetTypes from '../components/widgets';

export const useWidgetType = (contentType = 'DefaultWidget') => {
  return {
    name: widgetTypes[contentType].name,
    component: widgetTypes[contentType].component,
    dialog: widgetTypes[contentType].dialog || null
  };
};

export const useDialogToggle = () => {
  const [dialogOpened, setDialogOpened] = useState(false);

  const openDialog = () => setDialogOpened(true);
  const handleDialogClose = () => setDialogOpened(false);

  return [dialogOpened, openDialog, handleDialogClose];
};

export const useFormData = (data) => {
  const [values, setValues] = useState(data);

  const handleChange = fieldName => event => {
    const { target: { type, value, checked } } = event;
    const fieldValue = type !== 'checkbox' ? value : checked;

    setValues({ ...values, [fieldName]: fieldValue });
  };

  const getFormDataProps = (fieldName, initialValue = '') => {
    if (!values[fieldName]) {
      values[fieldName] = initialValue;
    }

    return {
      value: values[fieldName],
      onChange: handleChange(fieldName)
    }
  };

  return { values, handleChange, getFormDataProps };
};