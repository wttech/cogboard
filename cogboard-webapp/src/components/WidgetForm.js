import React from 'react';
import { string, number, bool } from 'prop-types';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled/macro';

import widgetTypes from './widgets';
import { useFormData } from '../hooks';
import DropdownField from './DropdownField';
import WidgetTypeForm from './WidgetTypeForm';

import { Box, FormControlLabel, FormControl, MenuItem, TextField, Switch } from '@material-ui/core';
import { COLUMNS_MIN, ROWS_MIN } from '../constants';

const StyledFieldset = styled(FormControl)`
  display: flex;
  margin-bottom: 32px;
  min-width: 300px;
`;

const StyledNumberField = styled(TextField)`
  flex-basis: calc(50% - 18px);
`;

const renderWidgetTypesMenu = (widgetTypes) =>
  Object.entries(widgetTypes).map(([type, { name }]) => {
    const formatedName = type === 'DefaultWidget' ? <em>{name}</em> : name;

    return <MenuItem key={type} value={type}>{formatedName}</MenuItem>;
  });

const WidgetForm = ({ renderActions, ...initialFormValues }) => {
  const boardColumns = useSelector(
    ({ ui, boards }) => boards.boardsById[ui.currentBoard].columns
  );
  const { values, handleChange } = useFormData(initialFormValues);

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
          onChange={handleChange('title')}
          id="title"
          InputLabelProps={{
            shrink: true
          }}
          label="Title"
          margin="normal"
          value={values.title}
        />
        <Box
          display="flex"
          justifyContent="space-between"
        >
          <StyledNumberField
            onChange={handleChange('columns')}
            id="columns"
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{
              min: COLUMNS_MIN,
              max: boardColumns
            }}
            label="Columns"
            margin="normal"
            value={values.columns}
            type="number"
          />
          <StyledNumberField
            onChange={handleChange('rows')}
            id="rows"
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{
              min: ROWS_MIN,
              max: 4
            }}
            label="Rows"
            margin="normal"
            value={values.rows}
            type="number"
          />
        </Box>
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
      />
      {renderActions(values)}
    </>
  );
};

WidgetForm.propTypes = {
  disabled: bool,
  columns: number,
  goNewLine: bool,
  rows: number,
  title: string,
  type: string
};

WidgetForm.defaultProps = {
  disabled: false,
  columns: 1,
  goNewLine: false,
  rows: 1,
  title: 'Default Widget',
  type: 'DefaultWidget'
};

export default WidgetForm;