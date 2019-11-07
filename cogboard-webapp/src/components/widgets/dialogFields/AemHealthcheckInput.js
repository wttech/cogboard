import React from 'react';
import { useTheme } from '@material-ui/styles';

import { AEM_HEALTH_CHECKS } from '../../../constants';

import { Input, InputLabel, Checkbox, MenuItem, ListItemText, Select, FormHelperText } from '@material-ui/core';
import { StyledFormControl } from './../../styled';

import { hasError } from '../../helpers';

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
        input={<Input id={inputId}/>}
        renderValue={value => `${value.length} selected`}
        data-cy={dataCy}
      >
        {Object.entries(AEM_HEALTH_CHECKS).map(([name, label]) =>
          <MenuItem key={name} value={name}>
            <Checkbox checked={value.includes(name)}/>
            <ListItemText primary={label}/>
          </MenuItem>
        )}
      </Select>
      {hasError(error) && <FormHelperText data-cy={`${dataCy}-error`}>{error}</FormHelperText>}
    </StyledFormControl>
  );
};

export default AemHealthcheckInput;

