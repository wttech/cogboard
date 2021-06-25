import styled from '@emotion/styled/macro';
import { COLORS } from '../../../../constants/';

export const PullRequestContainer = styled('div')`
  padding: 15px 8px;
  margin: 10px auto;
  border-radius: 3px;
  background: ${COLORS.WHITE};
  color: ${COLORS.BLACK};

  &:hover {
    color: ${COLORS.BLUE};
  }
`;

export const PullRequestLink = styled('a')`
  text-decoration: none;
`;
