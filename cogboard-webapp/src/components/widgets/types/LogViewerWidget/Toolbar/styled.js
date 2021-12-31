import styled from '@emotion/styled/macro';
import { IconButton } from '@material-ui/core';
import { COLORS } from '../../../../../constants';

export const Wrapper = styled.div`
  top: 0;
  position: absolute;
  overflow-x: hidden;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
  gap: 1em;
`;

export const StyledIconButton = styled(IconButton)`
  ${props =>
    props.enabled
      ? `
        color: ${COLORS.BLUE}; 
        background-color: ${COLORS.LIGHT_SHADE}
      `
      : ''}
`;
StyledIconButton.defaultProps = {
  size: 'small'
};
