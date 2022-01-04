import styled from '@emotion/styled/macro';
import { IconButton } from '@material-ui/core';
import { COLORS } from '../../../../../constants';

export const Wrapper = styled.div`
  width: 100%;
  top: 0;
  position: absolute;
  overflow-x: scroll;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 1em;
  overflow-x: hidden;
}
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
