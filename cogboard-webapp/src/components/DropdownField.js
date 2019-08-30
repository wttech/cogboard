import React, { useEffect, useState } from 'react';

import { FormControl, InputLabel, Input, Select } from '@material-ui/core';

const DropdownField = props => {
  const {
    onChange,
    id,
    label,
    value,
    name,
    children,
    dropdownItems,
    itemsUrl
  } = props;
  const initialLoaded = !itemsUrl;
  const [options, setOptions] = useState(dropdownItems);
  const [loaded, setLoaded] = useState(initialLoaded);

  useEffect(() => {
    if (itemsUrl) {
      fetch(itemsUrl)
        .then(response => response.json())
        .then(data => {
          setOptions(data);
          setLoaded(true);
        })
        .catch(console.error);
    }
  }, [itemsUrl]);

  return (
    <FormControl>
      <InputLabel
        shrink
        htmlFor={id}
      >
        {label}
      </InputLabel>
      <Select
        onChange={onChange}
        value={value}
        input={<Input name={name} id={id} />}
        name={name}
      >
        {loaded && children(options)}
      </Select>
    </FormControl>
  );
};

DropdownField.defaultProps = {
  value: ''
};

export default DropdownField;