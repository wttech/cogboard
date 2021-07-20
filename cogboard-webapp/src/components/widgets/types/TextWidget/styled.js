import styled from '@emotion/styled/macro';

import { Typography } from '@material-ui/core';

export const TypographyVariant = styled(Typography)`
  height: 100%;
  ${({ variant }) =>
    (variant === 'h2' || variant === 'h3') && 'line-height: initial'}
`;

export const CenterWrapper = styled.div`
  height: ${({ isVertical }) => (isVertical ? '100%' : 'auto')};

  display: flex;
  align-items: center;
  justify-content: center;
  ${({ isVertical }) => isVertical && `text-align: center;`}
`;

export const StyledPre = styled.pre`
  margin: 0;
  font-family: inherit;
`;

export const RotatedStyledPre = styled(StyledPre)`
  transform: rotate(-90deg);
  white-space: nowrap;
`;

export const OverflowingText = component => styled(component)`
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SingleLineText = component => styled(component)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const SetWidth = (component, componentWidth) => styled(component)`
  min-width: ${componentWidth}px;
  max-width: ${componentWidth}px;
`;
