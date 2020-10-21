import React from 'react';

import { StyledFieldset, StyledFormFieldWrapper } from '../styled';
import { Box } from '@material-ui/core';
import FormField from '../FormField';

const DynamicForm = ({ values, fields, handleChange, errors, rootName }) => {
  const createGroupedFields = (groupedFields, index) => {
    return (
      <Box key={ `dynamicForm-field-${index}`} display="flex" justifyContent="space-between">
        {groupedFields.map((field, id) => {
          return (
            <StyledFormFieldWrapper key={ `dynamicForm-groupField-${id}`}>
              <FormField
                field={field}
                values={values}
                handleChange={handleChange}
                errors={errors}
                rootName={rootName}
              />
            </StyledFormFieldWrapper>
          );
        })}
      </Box>
    );
  };

  return (
    <>
      <StyledFieldset component="fieldset">
        {fields.map((field, id) => {
          if (typeof field === 'string') {
            return (
              <StyledFormFieldWrapper key={ `dynamicForm-field-${id}`}>
                <FormField
                  field={field}
                  values={values}
                  handleChange={handleChange}
                  errors={errors}
                  rootName={rootName}
                />
              </StyledFormFieldWrapper>
            );
          } else {
            return createGroupedFields(field, id);
          }
        })}
      </StyledFieldset>
    </>
  );
};

export default DynamicForm;
