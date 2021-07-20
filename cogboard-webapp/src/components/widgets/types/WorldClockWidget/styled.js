import styled from '@emotion/styled/macro';

export const TimePre = styled.pre`
  font-weight: bold;
  font-family: inherit;
  font-size: 180%;
  margin: 0 auto;
  line-height: ${({ textSize }) => {
    switch (textSize) {
      case 'h5':
        return 0.8;
      case 'h6':
        return 1.1;
      case 'subtitle1':
        return 1.5;
      case 'subtitle2':
        return 1.85;
      default:
        return 0.5;
    }
  }};
`;

export const DatePre = styled.pre`
  font-family: inherit;
  margin: 0.25em 0 auto;
  line-height: 1;
`;
