import React, { useState } from 'react';
import { string, number, bool } from 'prop-types';
import { useSelector } from 'react-redux';

import widgetTypes from '../widgets';
import { useFormData } from '../../hooks';
import { sortByKey } from '../../helpers';
import {
  WIDGET_ROWS_MIN,
  WIDGET_COLUMNS_MIN,
  WIDGET_ROWS_MAX
} from '../../constants';

import {
  Box,
  FormControlLabel,
  FormControl,
  TextField,
  Switch,
  Tab
} from '@material-ui/core';
import DropdownField from '../DropdownField';
import WidgetTypeForm from '../WidgetTypeForm';
import { StyledNumberField, StyledTabPanel, StyledTabs } from './styled';
import { renderWidgetTypesMenu } from './helpers';
import { StyledFieldset } from '../styled';

const WidgetForm = ({ renderActions, ...initialFormValues }) => {
  const boardColumns = useSelector(
    ({ ui, boards }) => boards.boardsById[ui.currentBoard].columns
  );
  const { values, handleChange } = useFormData(initialFormValues);
  const [tabValue, setTabValue] = useState(0);

  const widgetType = widgetTypes[values.type];
  const dialogFieldNames =
    widgetType && widgetType.dialogFields ? widgetType.dialogFields : [];
  const hasDialogFields = dialogFieldNames.length !== 0;

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <StyledTabs
        value={tabValue}
        onChange={handleTabChange}
        variant="fullWidth"
      >
        <Tab label="General" data-cy="widget-form-general-tab" />
        {hasDialogFields && (
          <Tab label={widgetType.name} data-cy="widget-form-dynamic-tab" />
        )}
      </StyledTabs>
      <StyledTabPanel value={tabValue} index={0}>
        <StyledFieldset component="fieldset">
          <DropdownField
            onChange={handleChange('type')}
            label="Type"
            id="widget-type"
            name="type"
            value={values.type}
            dropdownItems={sortByKey(widgetTypes, 'name')}
            data-cy="widget-form-type-select"
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
            inputProps={{ 'data-cy': 'widget-form-title-input' }}
          />
          <Box display="flex" justifyContent="space-between">
            <StyledNumberField
              onChange={handleChange('columns')}
              id="columns"
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{
                min: WIDGET_COLUMNS_MIN,
                max: boardColumns,
                'data-cy': 'widget-form-columns-input'
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
                min: WIDGET_ROWS_MIN,
                max: WIDGET_ROWS_MAX,
                'data-cy': 'widget-form-rows-input'
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
                  inputProps={{ 'data-cy': 'widget-form-go-new-line-checkbox' }}
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
                  inputProps={{ 'data-cy': 'widget-form-disable-checkbox' }}
                />
              }
              label="Disable"
            />
          </FormControl>
        </StyledFieldset>
      </StyledTabPanel>
      {hasDialogFields && (
        <StyledTabPanel value={tabValue} index={1}>
          <WidgetTypeForm
            type={values.type}
            values={values}
            handleChange={handleChange}
          />
        </StyledTabPanel>
      )}
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
