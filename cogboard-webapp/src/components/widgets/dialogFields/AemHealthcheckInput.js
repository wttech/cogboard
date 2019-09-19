import React from 'react';
import styled from '@emotion/styled/macro';

import { Input } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { ListItemText } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';

import { AEM_HEALTH_CHECKS } from '../../../constants';

const StyledFormControl = styled(FormControl)`
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
  `;

const AemHealthcheckInput = props => {
  const { onChange, value } = props;
  const inputId = 'aemhealthcheck-metrics-input';

  return (
    <StyledFormControl>
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

