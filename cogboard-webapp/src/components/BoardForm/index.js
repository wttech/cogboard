import React, { useState, useEffect } from 'react';
import useForm from 'react-hook-form';
import { string, number, bool } from 'prop-types';

import { COLUMNS_MAX, COLUMNS_MIN } from '../../constants';

import { FormControl, FormControlLabel, Switch, TextField } from '@material-ui/core';
import { StyledFieldset } from './styled';

const BoardForm = ({ onSubmit, renderActions, ...initialFormValues }) => {
  const { register, handleSubmit, errors, setValue } = useForm({
    defaultValues: initialFormValues
  });

  const [values, setSwitchValue] = useState({ autoSwitch: initialFormValues.autoSwitch });

  const handleSwitchChange = (event) => {
    const checked = event.target.checked
    setValue("autoSwitch", checked);
    setSwitchValue({ autoSwitch: checked })
  }

  useEffect(() => {
    register({ name: "autoSwitch" })
  }, [register])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StyledFieldset component="fieldset">
        <TextField
          name="title"
          InputLabelProps={{
            shrink: true
          }}
          label="Title"
          margin="normal"
          inputRef={register({
            required: 'This field is required.', 
            pattern: /^[^A\s].*$/i
          })}
          error={errors.title ? true : false}
          helperText={errors.title ? errors.title.message : ''}
        />
        <TextField
          name="columns"
          InputLabelProps={{
            shrink: true
          }}
          inputProps={{
            min: COLUMNS_MIN,
            max: COLUMNS_MAX
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
          helperText={errors.columns ? errors.columns.message : ''}
        />
        <FormControl margin="normal">
          <FormControlLabel
            control={
              <Switch
                name="autoSwitch"
                color="primary"
                checked={ values.autoSwitch }
                onChange={ handleSwitchChange }
              />
            }
            label="Auto switch"
          />
        </FormControl>
      </StyledFieldset>
      {renderActions()}
    </form>
  );
};

BoardForm.propTypes = {
  autoSwitch: bool,
  columns: number,
  title: string,
};

BoardForm.defaultProps = {
  autoSwitch: true,
  columns: 8,
  title: 'Board',
};

export default BoardForm;