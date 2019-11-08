import React from 'react';
import { useSelector } from 'react-redux';
import { string, number, bool } from 'prop-types';

import {
  FormControl,
  FormControlLabel,
  Switch,
  TextField
} from '@material-ui/core';
import { StyledFieldset, StyledValidationMessages } from './styled';
import { useFormData } from '../../hooks';
import { getBoards } from '../../selectors';
import { createValidationSchema } from './validators';
import { trimLeadingZeros } from '../../helpers';

import NumberInput from '../widgets/dialogFields/NumberInput';

const BoardForm = ({
  onSubmit,
  renderActions,
  boardId,
  ...initialFormValues
}) => {
  const boards = useSelector(getBoards);
  const validationSchema = createValidationSchema(boardId, boards);
  const { values, handleChange, handleSubmit, errors } = useFormData(
    initialFormValues,
    validationSchema,
    true
  );

  const handleNumberInput = event => {
    const {
      target: { value }
    } = event;

    event.target.value = trimLeadingZeros(value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate="novalidate">
      <StyledFieldset component="fieldset">
        <TextField
          onChange={handleChange('title')}
          id="title"
          InputLabelProps={{
            shrink: true
          }}
          label="Title"
          margin="normal"
          value={values.title}
          error={errors.title !== undefined}
          helperText={
            <StyledValidationMessages
              messages={errors.title}
              data-cy={'board-form-title-error'}
            />
          }
          inputProps={{ 'data-cy': 'board-form-title-input' }}
        />
        <NumberInput
          onChange={handleChange('columns')}
          onInput={handleNumberInput}
          id="columns"
          InputLabelProps={{
            shrink: true
          }}
          inputProps={{ 'data-cy': 'board-form-columns-input' }}
          label="Columns"
          margin="normal"
          value={values.columns}
          error={errors.columns !== undefined}
          FormHelperTextProps={{ component: 'div' }}
          helperText={
            <StyledValidationMessages
              messages={errors.columns}
              data-cy="board-form-columns-error"
            />
          }
        />
        <FormControl margin="normal">
          <FormControlLabel
            control={
              <Switch
                onChange={handleChange('autoSwitch')}
                checked={values.autoSwitch}
                color="primary"
                value="autoSwitch"
                inputProps={{ 'data-cy': 'board-form-auto-switch-checkbox' }}
              />
            }
            label="Auto switch"
          />
        </FormControl>
        {values.autoSwitch && (
          <NumberInput
            onChange={handleChange('switchInterval')}
            onInput={handleNumberInput}
            id="switchInterval"
            InputLabelProps={{
              shrink: true
            }}
            label="Switch interval [s]"
            margin="normal"
            value={values.switchInterval}
            error={errors.switchInterval !== undefined}
            FormHelperTextProps={{ component: 'div' }}
            helperText={
              <StyledValidationMessages
                messages={errors.switchInterval}
                data-cy="board-form-switch-interval-error"
              />
            }
            inputProps={{ 'data-cy': 'board-form-switch-interval-input' }}
          />
        )}
      </StyledFieldset>
      {renderActions()}
    </form>
  );
};

BoardForm.propTypes = {
  autoSwitch: bool,
  columns: number,
  switchInterval: number,
  title: string
};

BoardForm.defaultProps = {
  autoSwitch: true,
  columns: 8,
  switchInterval: 60,
  title: 'Board'
};

export default BoardForm;
