import styled from '@emotion/styled/macro';
import { TextField } from '@material-ui/core';
import ValidationMessages from '../ValidationMessages';
import CancelButton from '../CancelButton';

export const StyledNumberField = styled(TextField)`
  flex-basis: calc(50% - 18px);
`;

export const StyledValidationMessages = styled(ValidationMessages)`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

export const StyledCancelButton = styled(CancelButton)`
  margin-left: 20px;
`;
