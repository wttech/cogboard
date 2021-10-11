import React from 'react';

import { TextField } from '@material-ui/core';
import { Wrapper, CustomIconButton } from './styled';
import SearchIcon from '@material-ui/icons/Search';

const SearchInput = () => (
  <Wrapper>
    <TextField id="query" label="Search..." />
    <CustomIconButton size="small" variant="contained">
      <SearchIcon />
    </CustomIconButton>
  </Wrapper>
);

export default SearchInput;
