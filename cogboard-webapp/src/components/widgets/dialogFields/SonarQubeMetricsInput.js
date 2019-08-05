import React from 'react';
import styled from '@emotion/styled/macro';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

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
  const { onChange } = props;
  let { value } = props;
  value = value || ['blocker_violations','critical_violations','major_violations','minor_violations'];

  return (
    <StyledFormControl>
      <InputLabel htmlFor="select-multiple-checkbox">Metrics</InputLabel>
      <Select
        multiple
        value={value}
        onChange={onChange}
        input={<Input id="select-multiple-checkbox"/>}
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

