import React from 'react';
import styled from '@emotion/styled/macro';

import widgetTypes from './widgets';
import { useFormData } from '../hooks';
import DropdownField from './DropdownField';
import WidgetTypeForm from './WidgetTypeForm';

import { FormControlLabel, FormControl, MenuItem, TextField, Switch } from '@material-ui/core';

const StyledFieldset = styled(FormControl)`
  display: flex;
  margin-bottom: 32px;
  min-width: 300px;
`;

const renderWidgetTypesMenu = (widgetTypes) =>
  Object.entries(widgetTypes).map(([type, { name }]) => {
    const formatedName = type === 'DefaultWidget' ? <em>{name}</em> : name;

    return <MenuItem key={type} value={type}>{formatedName}</MenuItem>;
  });

const WidgetForm = ({ initialData, renderActions }) => {
  const {
    title = '',
    disabled = false,
    type,
    config = {},
    ...customInitialData
  } = initialData;
  const { columns = 1, goNewLine = false } = config;
  const { values, handleChange, getFormDataProps } = useFormData({
    disabled,
    type,
    columns,
    goNewLine,
  });

  return (
    <>
      <StyledFieldset component="fieldset">
        <DropdownField
          onChange={handleChange("type")}
          label="Type"
          id="widget-type"
          name="type"
          value={values.type}
          dropdownItems={widgetTypes}
        >
          {renderWidgetTypesMenu}
        </DropdownField>
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
            min: 1
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
      <WidgetTypeForm
        type={values.type}
        values={values}
        handleChange={handleChange}
        initialData={customInitialData}
      />
      {renderActions(values)}
    </>
  );
};

export default WidgetForm;