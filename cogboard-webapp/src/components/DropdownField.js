import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";

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
  const jwToken = useSelector(({ app }) => app.jwToken);

  useEffect(() => {
    if (itemsUrl) {
      const init = jwToken ? {
        headers: {
          'Authorization': jwToken
        }
      } : undefined;

      fetch(itemsUrl, init)
        .then(response => response.json())
        .then(data => {
          setOptions(data);
          setLoaded(true);
        })
        .catch(console.error);
    }
  }, [itemsUrl, jwToken]);

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