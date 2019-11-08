import React from 'react';
import { useTheme } from '@material-ui/styles';

import { ALL_SONARQUBE_METRICS } from '../../../constants';

import {
  Input,
  InputLabel,
  Checkbox,
  MenuItem,
  ListItemText,
  Select
} from '@material-ui/core';
import { StyledFormControl } from './../../styled';

const SonarQubeMetricsInput = props => {
  const { onChange, value } = props;
  const theme = useTheme();
  const inputId = 'sonarqube-metrics-input';

  return (
    <StyledFormControl theme={theme}>
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
