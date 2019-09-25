import React from 'react';

import { Input, InputLabel, Checkbox, MenuItem, ListItemText, Select } from '@material-ui/core';

import { StyledFormControl } from './../../styled';
import { AEM_HEALTH_CHECKS } from '../../../constants';

const AemHealthcheckInput = props => {
  const { onChange, value } = props;
  const inputId = 'aemhealthcheck-metrics-input';

  return (
    <StyledFormControl>
      <InputLabel htmlFor={inputId}>Health Checks</InputLabel>
      <Select
        multiple
        value={value}
        onChange={onChange}
        input={<Input id={inputId}/>}
        renderValue={value => `${value.length} selected`}
      >
        {Object.entries(AEM_HEALTH_CHECKS).map(([name, label]) =>
          <MenuItem key={name} value={name}>
            <Checkbox checked={value.includes(name)}/>
            <ListItemText primary={label}/>
          </MenuItem>
        )}
      </Select>
    </StyledFormControl>
  );
};

export default AemHealthcheckInput;

