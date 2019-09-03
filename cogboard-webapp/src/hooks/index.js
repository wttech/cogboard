import { useState } from 'react';

import { splitPropsGroupName } from '../components/helpers';

export const useDialogToggle = () => {
  const [dialogOpened, setDialogOpened] = useState(false);

  const openDialog = () => setDialogOpened(true);
  const handleDialogClose = () => setDialogOpened(false);

  return [dialogOpened, openDialog, handleDialogClose];
};

export const useFormData = (data) => {
  const [values, setValues] = useState(data);

  const setFieldValue = (fieldName, fieldValue) => {
    const [groupName, propName] = splitPropsGroupName(fieldName);

    if (groupName) {
      const groupValues = values[groupName];

      setValues({
        ...values,
        [groupName]: { ...groupValues, [propName]: fieldValue }
      });

      return;
    }

    setValues({ ...values, [propName]: fieldValue});
  };

  const handleChange = fieldName => event => {
    const { target: { type, value, checked } } = event;
    const valueType = {
      checkbox: checked,
      number: Number(value),
    };
    const fieldValue = valueType[type] !== undefined ? valueType[type] : value;

    setFieldValue(fieldName, fieldValue);
  };

  return { values, handleChange };
};

