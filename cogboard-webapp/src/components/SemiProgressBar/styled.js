import styled from '@emotion/styled/macro';

export const StyledSemiCircleContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;

  svg {
    transform: rotateY(180deg);
    overflow: hidden
  }
`;
