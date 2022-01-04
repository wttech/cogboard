import styled from '@emotion/styled/macro';
import { IconButton, TextField } from '@material-ui/core';

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

export const StyledTextField = styled(TextField)`
  min-width: 5rem;

  & > input {
    margin-right: 1.8rem;
  }
`;
