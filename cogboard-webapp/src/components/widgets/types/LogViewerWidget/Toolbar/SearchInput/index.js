import React, { useState, useEffect } from 'react';
import { useDebounce } from '../../../../../../hooks';

import { TextField } from '@material-ui/core';
import { Wrapper, CustomIconButton } from './styled';
import SearchIcon from '@material-ui/icons/Search';

const SearchInput = ({ setSearchFilter, debounce, minLetters }) => {
  const [searchBoxValue, setSearchBoxValue] = useState('');

  const valueToSearch = useDebounce(searchBoxValue, debounce);
  const enoughLetters = valueToSearch.length >= minLetters;
  useEffect(() => setSearchFilter(enoughLetters ? valueToSearch : ''), [
    valueToSearch,
    setSearchFilter,
    enoughLetters
  ]);

  const handleChange = e => setSearchBoxValue(e.target.value);

  return (
    <Wrapper>
      <TextField
        label="Search..."
        value={searchBoxValue}
        onChange={handleChange}
      />
      <CustomIconButton disabled size="small" variant="contained">
        <SearchIcon />
      </CustomIconButton>
    </Wrapper>
  );
};

export default SearchInput;
