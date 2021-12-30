import React, { useEffect } from 'react';
import { createValidationSchema } from '../../../../../../validation';
import { useFormData } from '../../../../../../../hooks';

import { Button } from '@material-ui/core';
import DynamicForm from '../../../../../../DynamicForm';
import { StyledCancelButton } from './styled';
import dialogFields from '../../../../../dialogFields';

const FilterForm = ({
  filters,
  onSubmit,
  handleCancel,
  id,
  filterSimilarLogsState,
  ...initialFormValues
}) => {
  const [filterSimilarLogs, setFilterSimilarLogs] = filterSimilarLogsState;

  useEffect(() => {
    if (filterSimilarLogs) {
      setFieldValue(dialogFields.RegExpField.name, filterSimilarLogs);
      setFilterSimilarLogs(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterSimilarLogs]);

  const formFields = ['LabelField', 'RegExpField'];
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
      <DynamicForm
        fields={formFields}
        values={values}
        handleChange={handleChange}
        errors={errors}
        rootName="filter-form"
      />
      <Button
        color="secondary"
        variant="contained"
        type="submit"
        data-cy="filter-form-submit-button"
      >
        Save
      </Button>
      <StyledCancelButton
        handleCancelClick={handleCancel}
        data-cy="filter-form-cancel-button"
      />
    </form>
  );
};

export default FilterForm;
