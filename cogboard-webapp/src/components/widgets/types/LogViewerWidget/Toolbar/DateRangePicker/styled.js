import styled from '@emotion/styled/macro';
import { IconButton } from '@material-ui/core';

export const PickerWrapper = styled.div`
  position: relative;
`;

export const StyledIconButton = styled(IconButton)`
  position: absolute;
  right: 0;
  bottom: 2px;
`;
StyledIconButton.defaultProps = {
  size: 'small',
  variant: 'outlined'
};
