import styled from '@emotion/styled/macro';
import { TextField, Tabs } from '@material-ui/core';
import TabPanel from '../TabPanel';

export const StyledNumberField = styled(TextField)`
  flex-basis: calc(50% - 18px);
`;

export const StyledTabPanel = styled(TabPanel)`
  margin-bottom: 12px;
`;

export const StyledTabs = styled(Tabs)`
  margin-bottom: 12px;
`;
