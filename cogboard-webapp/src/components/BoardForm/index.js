import React from 'react';
import { useSelector } from 'react-redux';
import { string, number, bool } from 'prop-types';

import { FormControl, FormControlLabel, Switch, TextField } from '@material-ui/core';
import { StyledFieldset } from './styled';
import { useFormData } from '../../hooks';
import { getBoards } from '../../selectors';
import { createValidationSchema, TITLE_MESSAGES, COLUMNS_MESSAGES, SWITCH_INTERVAL_MESSAGES } from './validators';
import StyledFormMessages from '../FormMessages';

const BoardForm = ({ onSubmit, renderActions, boardId, ...initialFormValues }) => {
  const boards = useSelector(getBoards);
  const validationSchema = createValidationSchema(boardId, boards)
  const {values, handleChange, handleSubmit, errors} = useFormData(initialFormValues, validationSchema);

  return (
    <form onSubmit={handleSubmit(onSubmit)} novalidate="novalidate">
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
          inputProps={{'data-cy': "board-form-title"}}
          error={errors.title}
          helperText={<StyledFormMessages messages={errors.title ? errors.title : TITLE_MESSAGES}/>}
          FormHelperTextProps={{'data-cy': "board-form-title-error"}}
        />
        <TextField
          onChange={handleChange('columns')}
          id="columns"
          InputLabelProps={{
            shrink: true
          }}
          inputProps={{'data-cy': "board-form-columns"}}
          label="Columns"
          margin="normal"
          value={values.columns}
          type="number"
          error={errors.columns}
          helperText={<StyledFormMessages messages={errors.columns ? errors.columns : COLUMNS_MESSAGES}/>}
          FormHelperTextProps={{'data-cy': "board-form-columns-error"}}
        />
        <FormControl margin="normal">
          <FormControlLabel
            control={
              <Switch
                onChange={handleChange('autoSwitch')}
                checked={values.autoSwitch}
                color="primary"
                value="autoSwitch"
                inputProps={{'data-cy': "board-form-auto-switch"}}
              />
            }
            label="Auto switch"
          />
        </FormControl>
        {values.autoSwitch &&
          <TextField
            onChange={handleChange('switchInterval')}
            id="switchInterval"
            InputLabelProps={{
              shrink: true
            }}
            label="Switch interval [s]"
            margin="normal"
            value={values.switchInterval}
            type="number"
            inputProps={{'data-cy': "board-form-switch-interval"}}
            error={errors.switchInterval}
            helperText={<StyledFormMessages messages={errors.switchInterval ? errors.switchInterval : SWITCH_INTERVAL_MESSAGES}/>}
            FormHelperTextProps={{'data-cy': "board-form-switch-interval-error"}}
          />
        }
      </StyledFieldset>
      {renderActions()}
    </form>
  );
};

BoardForm.propTypes = {
  autoSwitch: bool,
  columns: number,
  switchInterval: number,
  title: string,
};

BoardForm.defaultProps = {
  autoSwitch: true,
  columns: 8,
  switchInterval: 60,
  title: 'Board',
};

export default BoardForm;