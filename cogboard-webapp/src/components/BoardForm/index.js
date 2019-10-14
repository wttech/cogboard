import React from 'react';
import { string, number, bool } from 'prop-types';

import { useFormData } from '../../hooks';
import { COLUMNS_MAX, COLUMNS_MIN, COLUMNS_DEFAULT } from '../../constants';

import { FormControl, FormControlLabel, Switch, TextField } from '@material-ui/core';
import { StyledFieldset } from './styled';

const BoardForm = ({ renderActions, ...initialFormValues }) => {
  const { values, handleChange } = useFormData(initialFormValues);
  const { autoSwitch } = values;

  const handleInput = (e) => {
    const inputValue = e.target.value;
    let intValue = isNaN(parseInt(inputValue)) ? COLUMNS_MIN : parseInt(inputValue);
    intValue = intValue > COLUMNS_MAX ? COLUMNS_MAX : intValue;
    intValue = intValue < COLUMNS_MIN ? COLUMNS_MIN : intValue;
    e.target.value = intValue.toString();
  };

  const columnsPlaceholder = () => {
    return COLUMNS_DEFAULT.toString();
  }

  return (
    <>
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
          inputProps={{'data-cy': 'board-form-title-input'}}
        />
        <TextField
          onChange={handleChange('columns')}
          id="columns"
          InputLabelProps={{
            shrink: true
          }}
          onInput={handleInput}
          label="Columns"
          margin="normal"
          value={values.columns}
          type="number"
          placeholder={columnsPlaceholder}
        />
        <FormControl margin="normal">
          <FormControlLabel
            control={
              <Switch
                onChange={handleChange('autoSwitch')}
                checked={values.autoSwitch}
                color="primary"
                value="autoSwitch"
                inputProps={{'data-cy': 'board-form-auto-switch-checkbox'}}
              />
            }
            label="Auto switch"
          />
        </FormControl>
        {autoSwitch &&
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
            inputProps={{'data-cy': 'board-form-switch-interval-input'}}
          />
        }
      </StyledFieldset>
      {renderActions(values)}
    </>
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