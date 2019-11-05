import React from 'react';

import {
  Input,
  InputLabel,
  Checkbox,
  MenuItem,
  ListItemText,
  Select
} from '@material-ui/core';

import { StyledFormControl } from './../../styled';
import { ALL_SONARQUBE_METRICS } from '../../../constants';

const SonarQubeMetricsInput = props => {
  const { onChange, value } = props;
  const inputId = 'sonarqube-metrics-input';

  return (
    <StyledFormControl>
      <InputLabel htmlFor={inputId}>Metrics</InputLabel>
      <Select
        multiple
        value={value}
        onChange={onChange}
        input={<Input id={inputId} />}
        renderValue={value => `${value.length} selected`}
      >
        {ALL_SONARQUBE_METRICS.map(name => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={value.includes(name)} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  );
};

export default SonarQubeMetricsInput;
