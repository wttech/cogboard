import React from 'react';
import { string, number, bool } from 'prop-types';

import { useFormData } from '../../hooks';
import { COLUMNS_MAX, COLUMNS_MIN } from '../../constants';

import { FormControl, FormControlLabel, Switch, TextField } from '@material-ui/core';
import { StyledFieldset } from './styled';

const BoardForm = ({ renderActions, ...initialFormValues }) => {
  const { values, handleChange } = useFormData(initialFormValues);

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
          inputProps={{
            min: COLUMNS_MIN,
            max: COLUMNS_MAX
          }}
          label="Columns"
          margin="normal"
          value={values.columns}
          type="number"
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
      </StyledFieldset>
      {renderActions(values)}
    </>
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