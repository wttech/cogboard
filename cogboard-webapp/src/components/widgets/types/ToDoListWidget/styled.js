import styled from '@emotion/styled/macro';

import { Checkbox } from '@material-ui/core';

export const StyledCheckbox = styled(Checkbox)`
  margin-left: 8px;

  .MuiSvgIcon-root {
    font-size: 1rem;
  }

  &.Mui-checked {
    color: rgba(255, 255, 255, 0.7);
  }
`;
