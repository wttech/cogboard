import React, { useEffect, useContext } from 'react';
import { createValidationSchema } from '../../../../../validation';
import { useFormData } from '../../../../../../hooks';
import DynamicForm from '../../../../../DynamicForm';
import { Button, Tooltip, IconButton } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { StyledHorizontalContainer, StyledButtonContainer } from './styled';
import dialogFields from '../../../../dialogFields';
import LogsViewerContext from '../../context';
import { URL } from '../../../../../../constants';
import CancelButton from '../../../../../CancelButton';

const QuarantineForm = ({
  filters,
  onSubmit,
  handleCancel,
  id,
  ...initialFormValues
}) => {
  const logsViewerContext = useContext(LogsViewerContext);

  useEffect(() => {
    if (logsViewerContext.quarantine) {
      setFieldValue(
        dialogFields.RegExpField.name,
        logsViewerContext.quarantine
      );
      logsViewerContext.setQuarantine(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logsViewerContext.quarantine]);

  const formFields = [
    'LabelField',
    'RegExpField',
    'ReasonField',
    'EndTimestampField'
  ];
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
        <Tooltip title="Click on icon for more information">
          <IconButton
            href={URL.LOGSVIEWER_QUARANTINE}
            target="_blank"
            rel="noopener"
          >
            <InfoIcon />
          </IconButton>
        </Tooltip>
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
      <StyledButtonContainer>
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
        <p>In order to see the changes, you have to refresh the page.</p>
      </StyledButtonContainer>
    </form>
  );
};

export default QuarantineForm;
