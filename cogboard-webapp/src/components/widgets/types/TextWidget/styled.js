import styled from '@emotion/styled/macro';

import { Typography } from '@material-ui/core';

export const TypographyVariant = styled(Typography)`
  height: 100%;
`;

export const CenterWrapper = styled.div`
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledPre = styled.pre`
  font-family: inherit;
`;

export const RotatedStyledPre = styled(StyledPre)`
  transform: rotate(-90deg);
`;

export const OverflowingText = component => styled(component)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const SetWidth = (component, componentWidth) => styled(component)`
  min-width: ${componentWidth}px;
  max-width: ${componentWidth}px;
`;
