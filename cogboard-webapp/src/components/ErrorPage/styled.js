import styled from '@emotion/styled/macro';

import { getColor } from '../../helpers';

import { Link } from '@reach/router';

export const StyledLink = styled(Link)`
  font-size: 16px;
  color: inherit;
  text-decoration: none;
  border-bottom: 2px solid;
  padding-bottom: 4px;
  border-color: ${getColor('primary')};
`;
