import React from 'react';
import { Button, useTheme } from '@material-ui/core';
import { RedButton, Wrapper } from './styled';
import SearchInput from './SearchInput';
import ToolbarGroup from './ToolbarGroup';
import DateRangePicker from './DateRangePicker';
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterPicker from './FilterPicker';

const Toolbar = () => {
  const theme = useTheme();

  return (
    <Wrapper>
      <ToolbarGroup>
        <SearchInput />
      </ToolbarGroup>

      <FilterPicker />

      <DateRangePicker />

      <ToolbarGroup>
        <Button variant="contained" size="small">
          <GetAppIcon />
          Follow logs
        </Button>
        <RedButton variant="contained" size="small" theme={theme}>
          <DeleteIcon />
          Clear logs
        </RedButton>
      </ToolbarGroup>
    </Wrapper>
  );
};

export default Toolbar;
