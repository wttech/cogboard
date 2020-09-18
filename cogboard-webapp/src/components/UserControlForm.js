import React from 'react';
import { string, func } from 'prop-types';

import { useFormData } from '../hooks';
import { createValidationSchema } from './validation';

import { Button } from '@material-ui/core';
import DynamicForm from './DynamicForm';

const UserControlForm = ({ onSubmit, ...initialFormValues }) => {
  const formFields = [
    'CurrentPasswordField',
    'NewPasswordField',
    'PasswordConfirmationField'
  ];

  const constraints = {};

  const validationSchema = createValidationSchema(formFields, constraints);
  const { values, handleChange, withValidation, errors } = useFormData(
    initialFormValues,
    {
      initialSchema: validationSchema,
      onChange: true
    }
  );

  return (
    <form onSubmit={withValidation(onSubmit)} noValidate="novalidate">
      <DynamicForm
        fields={formFields}
        values={values}
        handleChange={handleChange}
        errors={errors}
        rootName="user-control-form"
      />
      <Button
        fullWidth
        color="secondary"
        variant="contained"
        type="submit"
        data-cy="user-control-form-submit-button"
      >
        Save
      </Button>
    </form>
  );
};

UserControlForm.propTypes = {
  onSubmit: func.isRequired,
  user: string
};

UserControlForm.defaultProps = {
  currentPassword: '',
  newPassword: '',
  passwordConfirmation: ''
};

export default UserControlForm;
