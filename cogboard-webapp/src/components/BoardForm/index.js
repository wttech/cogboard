import React from 'react';
import { string, number, bool } from 'prop-types';

import { useFormData } from '../../hooks';
import { COLUMNS_MAX, COLUMNS_MIN } from '../../constants';

import { FormControl, FormControlLabel, Switch, TextField } from '@material-ui/core';
import { StyledFieldset } from './styled';

const BoardForm = ({ renderActions, ...initialFormValues }) => {
  const { values, handleChange } = useFormData(initialFormValues);
  const { autoSwitch } = values;

  const handleInput = (e) => {
    const inputValue = e.target.value;
    let intValue = isNaN(parseInt(inputValue)) ? 0 : parseInt(inputValue);
    intValue = intValue > COLUMNS_MAX ? COLUMNS_MAX : intValue;
    intValue = intValue < COLUMNS_MIN ? COLUMNS_MIN : intValue;
    e.target.value = intValue.toString();
  };

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
          placeholder="1"
        />
        <FormControl margin="normal">
          <FormControlLabel
            control={
              <Switch
                onChange={handleChange('autoSwitch')}
                checked={values.autoSwitch}
                color="primary"
                value="autoSwitch"
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