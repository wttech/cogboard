import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled/macro';

import widgetTypes from './widgets';
import { useFormData, useWidgetType } from '../hooks';

import { Divider, FormControlLabel, Input, InputLabel, FormControl, MenuItem, TextField, Select, Switch } from '@material-ui/core';

const StyledFieldset = styled(FormControl)`
  display: flex;
  margin-bottom: 32px;
  min-width: 300px;
`;

const StyledDivider = styled(Divider)`
  margin-bottom: 24px;
`;

const renderWidgetTypesMenu = (widgetTypes) =>
  Object.entries(widgetTypes).map(([type, { name }]) => {
    const formatedName = type === 'DefaultWidget' ? <em>{name}</em> : name;

    return <MenuItem key={type} value={type}>{formatedName}</MenuItem>;
  });

const useDropdownField = (dropdownProps) => {
  const { data, dataUrl = '', id, name, onChange, value, renderItems } = dropdownProps;
  const [dropdownData, setDropdownData] = useState({});

  useEffect(() => {
    console.log('effect');
    if (dataUrl) {
      fetch(dataUrl)
        .then(response => response.json())
        .then(data => setDropdownData(data));
    }

    setDropdownData(data);
  }, [data, dataUrl, setDropdownData]);

  const DropdownField = () => (
    <FormControl>
      <InputLabel
        shrink
        htmlFor={id}
      >
        Type
      </InputLabel>
      <Select
        onChange={onChange(name)}
        value={value}
        input={<Input name={name} id={id} />}
        name={name}
      >
        {renderItems(dropdownData)}
      </Select>
    </FormControl>
  );

  return DropdownField;
};

const WidgetForm = ({ initialData, renderActions }) => {
  const { title = '', disabled = false, contentType, config = {} } = initialData;
  const { columns = 1, goNewLine = false } = config;
  const { values, handleChange, getFormDataProps } = useFormData({
    disabled,
    contentType,
    columns,
    goNewLine
  });
  const { dialog: CustomWidgetForm } = useWidgetType(values.contentType);
  const WidgetTypeDropdown = useDropdownField({
    data: widgetTypes,
    onChange: handleChange,
    id: 'widget-type',
    name: 'contentType',
    value: values.contentType,
    renderItems: renderWidgetTypesMenu
  });
  const emptyWidgetTypeForm = !CustomWidgetForm;

  return (
    <>
      <StyledFieldset component="fieldset">
        <WidgetTypeDropdown />
        <TextField
          id="title"
          InputLabelProps={{
            shrink: true
          }}
          label="Title"
          margin="normal"
          {...getFormDataProps('title', title)}
        />
        <TextField
          onChange={handleChange('columns')}
          id="columns"
          InputLabelProps={{
            shrink: true
          }}
          inputProps={{
            min: 0
          }}
          label="Columns"
          margin="normal"
          value={values.columns}
          type="number"
        />
        <FormControl margin="normal">
          <FormControlLabel
            control={
              <Switch
                onChange={handleChange('goNewLine')}
                checked={values.goNewLine}
                color="primary"
                value="goNewLine"
              />
            }
            label="Go to new line"
          />
        </FormControl>
        <FormControl margin="normal">
          <FormControlLabel
            control={
              <Switch
                onChange={handleChange('disabled')}
                checked={values.disabled}
                color="primary"
                value="disabled"
              />
            }
            label="Disable"
          />
        </FormControl>
      </StyledFieldset>
      {!emptyWidgetTypeForm &&
        <>
          <StyledDivider />
          <StyledFieldset component="fieldset">
            <CustomWidgetForm
              handleChange={handleChange}
              values={values}
            />
          </StyledFieldset>
        </>
      }
      {renderActions(values)}
    </>
  );
};

export default WidgetForm;