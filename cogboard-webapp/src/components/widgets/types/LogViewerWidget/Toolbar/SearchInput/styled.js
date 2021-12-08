import styled from '@emotion/styled/macro';
import { IconButton } from '@material-ui/core';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
`;

export const CustomIconButton = styled(IconButton)`
  position: absolute;
  bottom: 0;
  right: 0;
`;
CustomIconButton.defaultProps = {
  variant: 'outlined',
  size: 'small'
};
