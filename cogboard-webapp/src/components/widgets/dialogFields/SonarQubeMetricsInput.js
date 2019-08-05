import React from 'react';
import styled from '@emotion/styled/macro';

import { Input } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';

const StyledFormControl = styled(FormControl)`
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
  `;

const allMetrics = [
  "blocker_violations",
  "critical_violations",
  "major_violations",
  "minor_violations",
  "info_violations",
  "bugs",
  "code_smells",
  "vulnerabilities"
];

const SonarQubeMetricsInput = props => {
  const {onChange} = props;
  const inputId = 'sonarqube-metrics-input';
  let {value} = props;
  value = value || ['blocker_violations', 'critical_violations', 'major_violations', 'minor_violations'];

  return (
    <StyledFormControl>
      <InputLabel htmlFor={inputId}>Metrics</InputLabel>
      <Select
        multiple
        value={value}
        onChange={onChange}
        input={<Input id={inputId}/>}
        renderValue={value => `${value.length} selected`}
      >
        {allMetrics.map(name => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={value.includes(name)}/>
            <ListItemText primary={name}/>
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  );
};

export default SonarQubeMetricsInput;

