import React from 'react';
import { useTheme } from '@material-ui/styles';

import { ZABBIX_METRICS } from '../../../constants';

import {
  Input,
  InputLabel,
  Checkbox,
  MenuItem,
  ListItemText,
  Select,
  FormHelperText
} from '@material-ui/core';

import { StyledFormControl } from '../../styled';
import { hasError } from '../../../utils/components';

const ZabbixMetricsInput = ({ onChange, value, error, dataCy }) => {
  const inputId = 'zabbix-metrics-input';
  const theme = useTheme();

  return (
    <StyledFormControl error={hasError(error)} theme={theme}>
      <InputLabel htmlFor={inputId}>Metric</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        input={<Input id={inputId} />}
        renderValue={value => `${value}`}
        data-cy={dataCy}
      >
        {ZABBIX_METRICS.map(name => (
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

export default ZabbixMetricsInput;
