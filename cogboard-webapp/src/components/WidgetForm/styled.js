import styled from '@emotion/styled/macro';
import { TextField, Tabs } from '@material-ui/core';
import TabPanel from '../TabPanel';
import ValidationMessages from '../ValidationMessages';
import CancelButton from '../CancelButton';

export const StyledNumberField = styled(TextField)`
  flex-basis: calc(50% - 18px);
`;

export const StyledTabPanel = styled(TabPanel)`
  margin-bottom: 12px;
`;

export const StyledTabs = styled(Tabs)`
  margin-bottom: 12px;
`

export const StyledValidationMessages = styled(ValidationMessages)`
  list-style-type: none;
  margin: 0;
  padding: 0;
`

export const StyledCancelButton = styled(CancelButton)`
  margin-left: 20px;
`;