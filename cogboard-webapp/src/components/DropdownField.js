import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { FormControl, InputLabel, Input, Select } from '@material-ui/core';
import { getToken } from '../utils/auth';
import { getIsAuthenticated } from '../selectors';

const DropdownField = props => {
  const {
    onChange,
    id,
    label,
    value,
    name,
    children,
    dropdownItems,
    itemsUrl,
    optionalButton,
    dataCy,
    ...other
  } = props;
  const initialLoaded = !itemsUrl;
  const [options, setOptions] = useState(dropdownItems);
  const [loaded, setLoaded] = useState(initialLoaded);
  const isAuthenticated = useSelector(getIsAuthenticated);

  useEffect(() => {
    if (!loaded && itemsUrl) {
      const init = isAuthenticated
        ? {
            headers: {
              Authorization: getToken()
            }
          }
        : undefined;

      fetch(itemsUrl, init)
        .then(response => response.json())
        .then(data => {
          console.log(`DropdownField: fetched data`);
          setOptions(data);
          setLoaded(true);
        })
        .catch(console.error);
    }
  }, [loaded, itemsUrl, isAuthenticated]);

  const handleDataChange = () => {
    setLoaded(false);
  };

  return (
    <FormControl>
      <InputLabel shrink htmlFor={id}>
        {label}
      </InputLabel>
      <Select
        onChange={onChange}
        value={value}
        input={<Input name={name} id={id} />}
        name={name}
        SelectDisplayProps={other}
        data-cy={dataCy}
      >
        {loaded && children(options)}
      </Select>
      {/* TODO add loaded */}
      {optionalButton && optionalButton(options, handleDataChange)}
    </FormControl>
  );
};

DropdownField.defaultProps = {
  value: ''
};

export default DropdownField;
