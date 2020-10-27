import React from 'react';

import { TextField, Tooltip, IconButton } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { StyledValidationMessages } from '../../WidgetForm/styled';
import { StyledMultiLineWrapper } from './styled';
import { hasError } from '../../../utils/components';
import { URL } from '../../../constants';

const MultilineTextInput = ({ error, dataCy, values, label, ...other }) => {
  return (
    <StyledMultiLineWrapper>
      <TextField
        InputLabelProps={{
          shrink: true
        }}
        margin="normal"
        multiline={true}
        error={hasError(error)}
        FormHelperTextProps={{ component: 'div' }}
        label={label}
        helperText={
          <StyledValidationMessages
            messages={error}
            data-cy={`${dataCy}-error`}
          />
        }
        inputProps={{ 'data-cy': dataCy }}
        {...other}
      />
      {
        label.toLowerCase() === 'token' && (
          <Tooltip
            title="Click on icon for more information"
          >
            <IconButton
              href={ URL.CREDENTIAL_INFO }
              target="_blank"
              rel="noopener"
            >
              <InfoIcon />
            </IconButton>
          </Tooltip>
        )
      }
    </StyledMultiLineWrapper>
  );
};

export default MultilineTextInput;
