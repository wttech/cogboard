import React from 'react';

import {createValueRef} from './helpers';

import { StyledFieldset } from './styled';
import { Box } from '@material-ui/core';
import dialogFields from './widgets/dialogFields';


const DynamicForm = ({ values, fields, handleChange, errors, rootName }) => {

  const createField = (field) => {
    const {
      component: DialogField,
      name,
      initialValue = '',
      validator,
      ...dialogFieldProps
    } = dialogFields[field];

    const valueRef = createValueRef(values, initialValue, name);
    const dataCy = `${rootName}-${name}-input`;

    return (
      <DialogField
        key={name}
        values={values}
        value={valueRef}
        onChange={handleChange(name)}
        error={errors[name]}
        dataCy={dataCy}
        {...dialogFieldProps}
      />
    );
  }

  const createGroupedFields = (groupedFields) => {
    return (
      <Box
        display="flex"
        justifyContent="space-between"
      >
        {
          groupedFields.map(field => {
            return createField(field)
          })
        } 
      </Box>
    );
  }

  return (
    <>
      <StyledFieldset component="fieldset">
        {
          fields.map(field => {
            if (typeof field === 'string') {
              return createField(field)
            } else {
              return createGroupedFields(field)
            }
          })
        }
      </StyledFieldset>
    </>
  );
};

export default DynamicForm;