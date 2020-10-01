import React from 'react';

import { camelToKebab, createValueRef } from './helpers';
import dialogFields from '../widgets/dialogFields';

const FormField = ({ field, values, handleChange, errors, rootName }) => {
  const {
    component: DialogField,
    name,
    initialValue = '',
    valueUpdater,
    validator,
    ...dialogFieldProps
  } = dialogFields[field];

  const valueRef = createValueRef(values, initialValue, name);

  return (
    <DialogField
      key={name}
      values={values}
      value={valueRef}
      onChange={handleChange(name, valueUpdater)}
      error={errors[name]}
      dataCy={`${rootName}-${camelToKebab(name)}-input`}
      {...dialogFieldProps}
    />
  );
};

export default FormField;
