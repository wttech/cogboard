import styled from '@emotion/styled/macro';

import { FormControl } from '@material-ui/core';
import ValidationMessages from '../ValidationMessages';

export const StyledFieldset = styled(FormControl)`
  display: flex;
  margin-bottom: 32px;
  min-width: 300px;
`;

export const StyledValidationMessages = styled(ValidationMessages)`
  list-style-type: none;
  margin: 0;
  padding: 0;
`