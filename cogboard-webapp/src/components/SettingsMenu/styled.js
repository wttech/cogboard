import styled from '@emotion/styled/macro';

import { Tabs } from '@material-ui/core';
import AppDialog from '../AppDialog';
import TabPanel from '../TabPanel';

export const StyledAppDialog = styled(AppDialog)`
  max-width: 800px;
`;

export const StyledTabPanel = styled(TabPanel)`
  margin-bottom: 12px;
`;

export const StyledTabs = styled(Tabs)`
  margin-bottom: 12px;
`;
