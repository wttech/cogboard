import React, { useState, useEffect } from 'react';
import { func, number } from 'prop-types';
import { useDebounce } from '../../../../../../hooks';

import { Wrapper, CustomIconButton, StyledTextField } from './styled';
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
      <StyledTextField
        label="Search"
        value={searchBoxValue}
        onChange={handleChange}
      />
      <CustomIconButton disabled={!enoughLetters} onClick={clearSearch}>
        {enoughLetters ? <CloseIcon /> : <SearchIcon />}
      </CustomIconButton>
    </Wrapper>
  );
};

SearchInput.propTypes = {
  setSearchFilter: func.isRequired,
  debounce: number,
  minLetters: number
};

SearchInput.defaultProps = {
  debounce: 500,
  minLetters: 3
};

export default SearchInput;
