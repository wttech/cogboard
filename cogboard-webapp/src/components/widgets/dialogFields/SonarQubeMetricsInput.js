import React from 'react';
import { useTheme } from '@material-ui/styles';

import { ALL_SONARQUBE_METRICS } from '../../../constants';

import {
  Input,
  InputLabel,
  Checkbox,
  MenuItem,
  ListItemText,
  Select,
  FormHelperText
} from '@material-ui/core';

import { StyledFormControl } from './../../styled';
import { hasError } from '../../../utils/components';

const SonarQubeMetricsInput = ({ onChange, value, error, dataCy }) => {
  const inputId = 'sonarqube-metrics-input';
  const theme = useTheme();

  return (
    <StyledFormControl error={hasError(error)} theme={theme}>
      <InputLabel htmlFor={inputId}>Metrics</InputLabel>
      <Select
        multiple
        value={value}
        onChange={onChange}
        input={<Input id={inputId} />}
        renderValue={value => `${value.length} selected`}
        data-cy={dataCy}
      >
        {ALL_SONARQUBE_METRICS.map(name => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={value.includes(name)} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
      {hasError(error) && <FormHelperText>{error}</FormHelperText>}
    </StyledFormControl>
  );
};

export default SonarQubeMetricsInput;
