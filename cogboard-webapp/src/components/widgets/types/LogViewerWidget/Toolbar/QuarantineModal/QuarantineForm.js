import React from 'react';
import { createValidationSchema } from '../../../../../validation';
import { useFormData } from '../../../../../../hooks';
import DynamicForm from '../../../../../DynamicForm';
import { Button } from '@material-ui/core';
import CancelButton from '../../../../../CancelButton';

const QuarantineForm = ({
  filters,
  onSubmit,
  handleCancel,
  id,
  ...initialFormValues
}) => {
  const formFields = ['LabelField', 'RegExpField', 'ReasonField'];
  const constraints = {
    LabelField: {
      max: 25,
      labels: filters,
      labelId: id
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
    <form onSubmit={withValidation(onSubmit)} noValidate="novalidate">
      <DynamicForm
        fields={formFields}
        values={values}
        handleChange={handleChange}
        errors={errors}
        rootName="quarantine-form"
      />
      <Button
        color="secondary"
        variant="contained"
        type="submit"
        data-cy="quarantine-form-submit-button"
      >
        Save
      </Button>
      <CancelButton
        handleCancelClick={handleCancel}
        data-cy="quarantine-form-cancel-button"
      />
    </form>
  );
};

export default QuarantineForm;
