import React from 'react';
import useForm from 'react-hook-form';
import { string, number, bool } from 'prop-types';
import styled from '@emotion/styled/macro';

import { COLUMNS_MAX, COLUMNS_MIN } from '../../constants';

import { FormControl, FormControlLabel, Switch, TextField, Button } from '@material-ui/core';
import { StyledFieldset } from './styled';
import CancelButton from '../CancelButton';

const StyledCancelButton = styled(CancelButton)`
  margin-left: 20px;
`;

const BoardForm = ({ onSubmit, onCancel, ...initialFormValues }) => {
  const { register, handleSubmit, watch, errors } = useForm({
    defaultValues: initialFormValues
  });

  watch(errors.columns)

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
            pattern: /^[^A\s].*$/iu
          })}
          error={errors.title ? true : false}
          helperText={errors.title ? errors.title.message : ''}
        />
        <TextField
          name="columns"
          InputLabelProps={{
            shrink: true
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
                inputRef={register}
                color="primary"
              />
            }
            label="Auto switch"
          />
        </FormControl>
      </StyledFieldset>
      <Button
        color="primary"
        variant="contained"
        type="submit"
      >
        Add
      </Button>
      <StyledCancelButton handleCancelClick={onCancel} />
    </form>
  );
};

BoardForm.propTypes = {
  autoSwitch: bool,
  columns: number,
  title: string,
};

BoardForm.defaultProps = {
  autoSwitch: false,
  columns: 8,
  title: 'Board',
};

export default BoardForm;