import styled from '@emotion/styled/macro';

import { Button } from '@material-ui/core';

export const StyledButton = styled(Button)`
  margin-top: 12px;
`;

export const StyledHorizontalContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const StyledButtonContainer = styled.div`
  display: grid;
  grid-template: auto / auto auto 1fr;
  align-items: center;
  gap: 20px;

  p {
    margin: 0;
  }

  @media (max-width: 764px) {
    grid-template: auto auto / repeat(2, min-content) auto;
    p {
      grid-column: 1 / 4;
    }
  }
`;
