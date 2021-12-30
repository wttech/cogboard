import React, { useEffect } from 'react';
import { createValidationSchema } from '../../../../../validation';
import { useFormData } from '../../../../../../hooks';
import DynamicForm from '../../../../../DynamicForm';
import { Button } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { StyledHorizontalContainer, StyledCancelButton } from './styled';
import dialogFields from '../../../../dialogFields';

const QuarantineForm = ({
  filters,
  onSubmit,
  handleCancel,
  id,
  quarantineSimilarLogsState,
  ...initialFormValues
}) => {
  const [
    quarantineSimilarLogs,
    setQuarantineSimilarLogs
  ] = quarantineSimilarLogsState;

  useEffect(() => {
    if (quarantineSimilarLogs) {
      setFieldValue(dialogFields.RegExpField.name, quarantineSimilarLogs);
      setQuarantineSimilarLogs(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quarantineSimilarLogs]);

  const formFields = ['LabelField', 'RegExpField', 'ReasonField'];
  const constraints = {
    LabelField: {
      max: 25,
      labels: filters,
      labelId: id
    }
  };

  const validationSchema = createValidationSchema(formFields, constraints);
  const {
    values,
    handleChange,
    withValidation,
    errors,
    setFieldValue
  } = useFormData(initialFormValues, {
    initialSchema: validationSchema,
    onChange: true
  });

  return (
    <form onSubmit={withValidation(onSubmit)} noValidate="novalidate">
      <StyledHorizontalContainer>
        <InfoIcon />
        <p>
          Logs, any fields of which will be matched by the regular expression,
          will not be stored in the database or displayed.
        </p>
      </StyledHorizontalContainer>
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
      <StyledCancelButton
        handleCancelClick={handleCancel}
        data-cy="quarantine-form-cancel-button"
      />
    </form>
  );
};

export default QuarantineForm;
