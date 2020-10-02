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
import { Error } from '@material-ui/icons';
import { StyledFormControl, StyledFormHelperText } from '../../styled';
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
      {hasError(error) && (
        <StyledFormHelperText>
          <Error />
          {error}
        </StyledFormHelperText>
      )}
    </StyledFormControl>
  );
};

export default SonarQubeMetricsInput;
