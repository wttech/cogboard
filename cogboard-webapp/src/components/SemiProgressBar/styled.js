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

export const StyledPercentageText = styled.span`
  width: 100%;
  left: 0;
  text-align: center;
  bottom: 0;
  position: absolute;
`;
