import React, { useState } from 'react';
import { string } from 'prop-types';
import { useSelector } from 'react-redux';

import { useFormData } from '../../hooks';
import { createValidationSchema } from '../validation';

import { Button, Tab } from '@material-ui/core';
import { StyledCancelButton } from './styled';
import DynamicForm from '../DynamicForm';
import { getCredentials } from '../../selectors';
import { StyledTabPanel, StyledTabs } from '../styled';

const CredentialsForm = ({
  onSubmit,
  handleCancel,
  id,
  ...initialFormValues
}) => {
  const credentialsData = useSelector(getCredentials);
  const basicFormFields = [
    'LabelField',
    'UsernameField',
    'PasswordField',
    'PasswordConfirmationField'
  ];

  const tokenFormFields = ['TokenField'];

  const formFields = [...basicFormFields, ...tokenFormFields];

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

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div>
      <StyledTabs
        value={tabValue}
        onChange={handleTabChange}
        variant="fullWidth"
        indicatorColor="primary"
      >
        <Tab label="Basic" data-cy="credential-form-basic-tab" />
        <Tab label="Token" data-cy="credential-form-token-tab" />
      </StyledTabs>
      <form onSubmit={withValidation(onSubmit)} noValidate="novalidate">
        <StyledTabPanel value={tabValue} index={0}>
          <DynamicForm
            fields={basicFormFields}
            values={values}
            handleChange={handleChange}
            errors={errors}
            rootName="credential-form"
          />
        </StyledTabPanel>
        <StyledTabPanel value={tabValue} index={1}>
          <DynamicForm
            fields={tokenFormFields}
            values={values}
            handleChange={handleChange}
            errors={errors}
            rootName="credential-form"
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
