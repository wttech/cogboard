import React from 'react';

import { camelToKebab, createValueRef } from './helpers';

import { StyledFieldset } from '../styled';
import { Box } from '@material-ui/core';
import dialogFields from '../widgets/dialogFields';

const DynamicForm = ({ values, fields, handleChange, errors, rootName }) => {
  //TODO refactor so sub components are not created inside another component

  const createField = field => {
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

  const createGroupedFields = groupedFields => {
    return (
      <Box display="flex" justifyContent="space-between">
        {groupedFields.map(field => {
          return createField(field);
        })}
      </Box>
    );
  };

  return (
    <>
      <StyledFieldset component="fieldset">
        {fields.map(field => {
          if (typeof field === 'string') {
            return createField(field);
          } else {
            return createGroupedFields(field);
          }
        })}
      </StyledFieldset>
    </>
  );
};

export default DynamicForm;
