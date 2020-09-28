import styled from '@emotion/styled/macro';

import { Checkbox } from '@material-ui/core';

export const StyledCheckbox = styled(Checkbox)`
  margin-left: 15px;

  &.Mui-checked {
    color: rgba(255, 255, 255, 0.7);
  }
`;

export const StyledNoItemsInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  height: 100%;

  p {
    width: 100%;
    text-align: center;
  }
`;
