import React from 'react';
import { string } from 'prop-types';
import { useSelector } from 'react-redux';

import { useFormData } from '../../hooks';
import { createValidationSchema } from '../validation';

import { Button } from '@material-ui/core';
import { StyledCancelButton } from './styled';
import DynamicForm from '../DynamicForm';
import { getCredentials } from '../../selectors';
import { StyledTabPanel } from '../styled';

const CredentialsForm = ({
  onSubmit,
  handleCancel,
  id,
  ...initialFormValues
}) => {
  const credentialsData = useSelector(getCredentials);
  const formFields = [
    'LabelField',
    'UsernameField',
    'PasswordField',
    'PasswordConfirmationField',
    'TokenField'
  ];

  const constraints = {
    LabelField: {
      max: 25,
      labels: credentialsData,
      labelId: id
    },
    UsernameField: {
      max: 25
    }
  };

  const validationSchema = createValidationSchema(formFields, constraints);
  const { values, handleChange, withValidation, errors } = useFormData(
    initialFormValues,
    {
      initialSchema: validationSchema,
      onChange: true
    }
  );

  return (
    <div data-cy="app-credential-form-tab">
      <form onSubmit={withValidation(onSubmit)} noValidate="novalidate">
        <StyledTabPanel>
          <DynamicForm
            fields={formFields}
            values={values}
            handleChange={handleChange}
            errors={errors}
            rootName="credential-form-auth"
          />
        </StyledTabPanel>
        <Button
          color="secondary"
          variant="contained"
          type="submit"
          data-cy="credential-form-submit-button"
        >
          Save
        </Button>
        <StyledCancelButton
          handleCancelClick={handleCancel}
          data-cy="credential-form-cancel-button"
        />
      </form>
    </div>
  );
};

CredentialsForm.propTypes = {
  label: string,
  user: string
};

CredentialsForm.defaultProps = {
  label: '',
  user: '',
  password: '',
  confirmationPassword: '',
  token: ''
};

export default CredentialsForm;
