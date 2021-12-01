import React, { useState, useEffect } from 'react';
import { useDebounce } from '../../../../../../hooks';

import { TextField } from '@material-ui/core';
import { Wrapper, CustomIconButton } from './styled';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

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
  const clearSearch = () => {
    setSearchBoxValue('');
    setSearchFilter('');
  };

  return (
    <Wrapper>
      <TextField
        label="Search..."
        value={searchBoxValue}
        onChange={handleChange}
      />
      <CustomIconButton
        disabled={!enoughLetters}
        size="small"
        variant="contained"
        onClick={clearSearch}
      >
        {enoughLetters ? <CloseIcon /> : <SearchIcon />}
      </CustomIconButton>
    </Wrapper>
  );
};

export default SearchInput;
