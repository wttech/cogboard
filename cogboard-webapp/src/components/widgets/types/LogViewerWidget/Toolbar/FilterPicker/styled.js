import styled from '@emotion/styled/macro';
import { Box, Select, Chip } from '@material-ui/core';

const selectDefaultProps = {
  size: 'small',
  MenuProps: {
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left'
    },
    getContentAnchorEl: null
  }
};

export const ScrollableBox = styled(Box)`
  overflow-x: scroll;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const LogLevelSelect = styled(Select)`
  width: 6rem;
`;
LogLevelSelect.defaultProps = selectDefaultProps;

export const FiltersSelect = styled(Select)`
  width: 12rem;
`;
FiltersSelect.defaultProps = selectDefaultProps;

export const StyledChip = styled(Chip)`
  margin-right: 0.25rem;
`;
StyledChip.defaultProps = {
  size: 'small'
};

export const FiltersWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;
