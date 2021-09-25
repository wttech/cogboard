import React from 'react';

import { TextField } from '@material-ui/core';
import { Wrapper, CustomIconButton } from './styled';
import SearchIcon from '@material-ui/icons/Search';

export default function SearchInput() {
  return (
    <Wrapper>
      <TextField id="query" label="Search..." />
      <CustomIconButton size="small" variant="contained">
        <SearchIcon />
      </CustomIconButton>
    </Wrapper>
  );
}
