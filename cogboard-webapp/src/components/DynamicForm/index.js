import React from 'react';

import { StyledFieldset, StyledFormFieldWrapper } from '../styled';
import { Box } from '@material-ui/core';
import FormField from '../FormField';

const DynamicForm = ({ values, fields, handleChange, errors, rootName }) => {
  const createGroupedFields = groupedFields => {
    return (
      <Box display="flex" justifyContent="space-between">
        {groupedFields.map(field => {
          return (
            <StyledFormFieldWrapper>
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
        {fields.map(field => {
          if (typeof field === 'string') {
            return (
              <StyledFormFieldWrapper>
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
            return createGroupedFields(field);
          }
        })}
      </StyledFieldset>
    </>
  );
};

export default DynamicForm;
