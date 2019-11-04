import React from 'react';
import { useTheme } from '@material-ui/styles';

import { AEM_HEALTH_CHECKS } from '../../../constants';

import { Input, InputLabel, Checkbox, MenuItem, ListItemText, Select } from '@material-ui/core';
import { StyledFormControl } from './../../styled';

const AemHealthcheckInput = props => {
  const { onChange, value } = props;
  const theme = useTheme();
  const inputId = 'aemhealthcheck-metrics-input';

  return (
    <StyledFormControl theme={theme}>
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

