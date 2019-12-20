import React from 'react';
import { string, func } from 'prop-types';

import { useFormData } from '../hooks';
import { createValidationSchema } from './validation';
import { USER_LOGIN_LENGTH } from '../constants';

import { Button } from '@material-ui/core';
import DynamicForm from './DynamicForm';

const UserControlForm = ({ onSubmit, ...initialFormValues }) => {
  const formFields = [
    'UsernameField',
    'PasswordField',
    'PasswordConfirmationField'
  ];

  const constraints = {
    UsernameField: {
      max: USER_LOGIN_LENGTH
    }
  };

  const validationSchema = createValidationSchema(formFields, constraints);
  const { values, handleChange, withValidation, errors } = useFormData(
    initialFormValues,
    { initialSchema: validationSchema, onChange: true }
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
        color="primary"
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
  user: '',
  password: '',
  confirmationPassword: ''
};

export default UserControlForm;
