import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useForm from 'react-hook-form';
import { string, number, bool } from 'prop-types';

import { COLUMNS_MAX, COLUMNS_MIN, BOARD_TITLE_LENGTH_LIMIT, SWITCH_INTERVAL_MIN } from '../../constants';

import { FormControl, FormControlLabel, Switch, TextField } from '@material-ui/core';
import { StyledFieldset } from './styled';

const BoardForm = ({ onSubmit, renderActions, boardId, ...initialFormValues }) => {
  const { register, handleSubmit, errors, setValue } = useForm({
    defaultValues: initialFormValues
  });

  const allBoards = useSelector(({boards}) => Object.values(boards.boardsById));

  const [values, setSwitchValue] = useState({ autoSwitch: initialFormValues.autoSwitch });

  const handleSwitchChange = (event) => {
    const checked = event.target.checked;
    setValue("autoSwitch", checked);
    setSwitchValue({ autoSwitch: checked });
  }

  useEffect(() => {
    register({ name: "autoSwitch" });
  }, [register])

  const validateTitle = (id) => (value) => {
    const title = value.trim().replace(/\s+/g,' ');
    if (title.length < 1) {
      return 'Title cannot be blank';
    }
    return allBoards.every((board) => board.title !== title || board.id === id) || 'Title already in use.';
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} novalidate="novalidate">
      <StyledFieldset component="fieldset">
        <TextField
          name="title"
          InputLabelProps={{
            shrink: true
          }}
          label="Title"
          margin="normal"
          inputProps={{
            'data-cy': "board-form-title"
          }}
          inputRef={register({
            required: 'This field is required.',
            maxLength: {
              value: BOARD_TITLE_LENGTH_LIMIT,
              message: `Board title field is limited to ${BOARD_TITLE_LENGTH_LIMIT} characters.`
            },
            validate: validateTitle(boardId)
          })}
          error={errors.title ? true : false}
          helperText={errors.title ? errors.title.message : 'Title must be unique, and contains max 25 characters.'}
          FormHelperTextProps={{
            'data-cy': "board-form-title-error"
          }}
        />
        <TextField
          name="test.columns.value"
          InputLabelProps={{
            shrink: true
          }}
          inputProps={{
            min: COLUMNS_MIN,
            max: COLUMNS_MAX,
            'data-cy': "board-form-columns"
          }}
          label="Columns"
          margin="normal"
          type="number"
          inputRef={register({
            required: 'This field is required.',
            min: {
              value: COLUMNS_MIN,
              message: `The board should have at least ${COLUMNS_MIN} column.`
            },
            max: {
              value: COLUMNS_MAX,
              message: `The board should have at most ${COLUMNS_MAX} columns.`
            }
          })}
          error={errors.columns ? true : false}
          helperText={`Colums number must be between ${COLUMNS_MIN}-${COLUMNS_MAX}`}
          FormHelperTextProps={{
            'data-cy': "board-form-columns-error"
          }}
        />
        <FormControl margin="normal">
          <FormControlLabel
            control={
              <Switch
                name="autoSwitch"
                color="primary"
                checked={ values.autoSwitch }
                onChange={ handleSwitchChange }
                inputProps={{
                  'data-cy': "board-form-auto-switch"
                }}
              />
            }
            label="Auto switch"
          />
        </FormControl>
        {values.autoSwitch &&
          <TextField
            id="switchInterval"
            name="switchInterval"
            InputLabelProps={{
              shrink: true
            }}
            label="Switch interval [s]"
            margin="normal"
            type="number"
            inputRef={register({
              min: SWITCH_INTERVAL_MIN
            })}
            inputProps={{
              min: SWITCH_INTERVAL_MIN,
              'data-cy': "board-form-switch-interval"
            }}
            error={errors.switchInterval ? true : false}
            helperText={`Interval cannot be smaller than ${SWITCH_INTERVAL_MIN}s.`}
            FormHelperTextProps={{
              'data-cy': "board-form-switch-interval-error"
            }}
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