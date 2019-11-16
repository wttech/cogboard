import React from 'react';
import { string } from 'prop-types';

import { useFormData } from '../../hooks';
import { createValidationSchema } from '../validation';

import { Button } from '@material-ui/core';
import { StyledCancelButton } from './styled';
import DynamicForm from '../DynamicForm';

const EndpointForm = ({
  onSubmit,
  handleCancel,
  id,
  endpointData,
  ...initialFormValues
}) => {
  const formFields = ['LabelField', 'URL', 'PublicURL', 'CredentialField'];
  const constraints = {
    LabelField: {
      max: 25,
      labels: endpointData ? endpointData : [],
      labelId: id
    }
  };

  const validationSchema = createValidationSchema(formFields, constraints);
  const { values, handleChange, withValidation, errors } = useFormData(
    initialFormValues,
    { initialSchema: validationSchema, onChange: true }
  );

  console.log(values);

  return (
    <form onSubmit={withValidation(onSubmit)} noValidate="novalidate">
      <DynamicForm
        fields={formFields}
        values={values}
        handleChange={handleChange}
        errors={errors}
        rootName="endpoint-form"
      />
      <Button
        color="primary"
        variant="contained"
        type="submit"
        data-cy="endpoint-form-submit-button"
      >
        Save
      </Button>
      <StyledCancelButton
        handleCancelClick={handleCancel}
        data-cy="endpoint-form-cancel-button"
      />
    </form>
  );
};

EndpointForm.propTypes = {
  credentials: string,
  label: string,
  publicUrl: string,
  url: string
};

EndpointForm.defaultProps = {
  label: 'Label',
  url: '',
  publicUrl: '',
  credential: ''
};

export default EndpointForm;
