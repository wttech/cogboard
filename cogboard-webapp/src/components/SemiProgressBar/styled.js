import styled from '@emotion/styled/macro';

export const StyledPercentageText = styled.span`
  bottom: 0;
  left: 0;
  position: absolute;
  text-align: center;
  width: 100%;
`;

export const StyledSemiCircleContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;

  svg {
    overflow: hidden;
    transform: rotateY(180deg);
  }
`;
