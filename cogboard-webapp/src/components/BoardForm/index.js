import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { string, number, bool } from 'prop-types';

import { useFormData } from '../../hooks';
import { getBoards } from '../../selectors';
import { createValidationSchema } from '../validation';

import { Button } from '@material-ui/core';
import DynamicForm from '../DynamicForm';
import { StyledCancelButton } from './styled';
import boardTypes from '../boards';

import {
  BOARD_TITLE_LENGTH_LIMIT,
  BOARD_COLUMNS_MIN,
  BOARD_COLUMNS_MAX,
  SWITCH_INTERVAL_MIN
} from '../../constants';

const BoardForm = ({
  handleSubmit,
  handleCancel,
  boardId,
  ...initialFormValues
}) => {
  const boards = useSelector(getBoards);
  const generalFields = [
    'UniqueTitleField',
    'BoardTypeField',
    'AutoSwitchField',
    'SwitchInterval'
  ];

  const constraints = {
    UniqueTitleField: {
      max: BOARD_TITLE_LENGTH_LIMIT,
      boardId: boardId,
      boards: boards
    },
    ColumnField: {
      min: BOARD_COLUMNS_MIN,
      max: BOARD_COLUMNS_MAX
    },
    SwitchInterval: {
      min: SWITCH_INTERVAL_MIN
    }
  };

  const {
    values,
    handleChange,
    withValidation,
    errors,
    setValidationSchema
  } = useFormData(initialFormValues, {
    initialSchema: createValidationSchema(generalFields, constraints),
    onChange: true
  });

  const boardType = boardTypes[values.type];
  const dialogFields =
    boardType && boardType.dialogFields
      ? [...generalFields, ...boardType.dialogFields]
      : [];

  useEffect(() => {
    const validationSchema = createValidationSchema(dialogFields, constraints);
    setValidationSchema(validationSchema);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.type]);

  return (
    <form onSubmit={withValidation(handleSubmit)} noValidate="novalidate">
      <DynamicForm
        fields={dialogFields}
        values={values}
        handleChange={handleChange}
        errors={errors}
        rootName="board-form"
      />
      <Button
        color="primary"
        variant="contained"
        type="submit"
        data-cy="board-form-submit-button"
      >
        Save
      </Button>
      <StyledCancelButton
        handleCancelClick={handleCancel}
        data-cy="board-form-cancel-button"
      />
    </form>
  );
};

BoardForm.propTypes = {
  autoSwitch: bool,
  columns: number,
  switchInterval: number,
  title: string,
  type: string
};

BoardForm.defaultProps = {
  autoSwitch: false,
  columns: 8,
  switchInterval: 60,
  title: 'Board',
  type: 'WidgetBoard'
};

export default BoardForm;
