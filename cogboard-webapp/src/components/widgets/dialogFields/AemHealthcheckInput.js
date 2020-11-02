import React from 'react';
import { useTheme } from '@material-ui/styles';

import { AEM_HEALTH_CHECKS } from '../../../constants';

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

const AemHealthcheckInput = ({ onChange, value, error, dataCy }) => {
  const theme = useTheme();
  const inputId = 'aemhealthcheck-metrics-input';

  return (
    <StyledFormControl error={hasError(error)} theme={theme}>
      <InputLabel htmlFor={inputId}>Health Checks</InputLabel>
      <Select
        multiple
        value={value}
        onChange={onChange}
        input={<Input id={inputId} />}
        renderValue={value => `${value.length} selected`}
        data-cy={dataCy}
      >
        {AEM_HEALTH_CHECKS.map((healthcheck) => (
          <MenuItem key={healthcheck.value} value={healthcheck.value}>
            <Checkbox checked={value.includes(healthcheck.value)} />
            <ListItemText primary={healthcheck.display} />
          </MenuItem>
        ))}
      </Select>
      {hasError(error) && (
        <StyledFormHelperText data-cy={`${dataCy}-error`}>
          <Error />
          {error}
        </StyledFormHelperText>
      )}
    </StyledFormControl>
  );
};

export default AemHealthcheckInput;
