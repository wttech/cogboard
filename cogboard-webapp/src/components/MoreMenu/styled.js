import styled from '@emotion/styled/macro';

import { IconButton, MenuList } from '@material-ui/core';

export const StyledIcon = styled(IconButton)`
  padding: 0;
`;

export const StyledMenuList = styled(MenuList)`
  &:focus {
    outline: none;
  }
`;
