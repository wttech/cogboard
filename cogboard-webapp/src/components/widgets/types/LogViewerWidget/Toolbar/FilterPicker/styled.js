import styled from '@emotion/styled/macro';
import { Box, Select, Chip, FormControl } from '@material-ui/core';

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

export const LogLevelFormControl = styled(FormControl)`
  flex-grow: 1;
  min-width: 6rem;
`;
export const LogLevelSelect = Select;
LogLevelSelect.defaultProps = selectDefaultProps;

export const FiltersFormControl = styled(FormControl)`
  width: 100%;
`;
export const FiltersSelect = styled(Select)`
  width: 100%;
  min-width: 10rem;
  & .MuiBox-root {
    max-height: 19px;
  }
`;
FiltersSelect.defaultProps = selectDefaultProps;

export const StyledChip = styled(Chip)`
  margin-right: 0.25rem;
  height: 18px;
  position: relative;
  top: -1px;

  & > svg {
    margin-right: 2px;
  }
`;
StyledChip.defaultProps = {
  size: 'small'
};

export const FiltersWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  flex-grow: 8;
`;
