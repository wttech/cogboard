import React, { useState } from 'react';
import { string, number, bool } from 'prop-types';
import { useSelector } from 'react-redux';

import widgetTypes from '../widgets';
import { useFormData } from '../../hooks';
import { sortByKey } from "../helpers";

import { createValidationSchema, validationSchemaModificator } from './validators';

import { Box, FormControlLabel, FormControl, TextField, Switch, Tab } from '@material-ui/core';
import DropdownField from '../DropdownField';
import WidgetTypeForm from '../WidgetTypeForm';
import { StyledNumberField, StyledTabPanel, StyledTabs, StyledValidationMessages } from './styled';
import { renderWidgetTypesMenu } from './helpers';
import { StyledFieldset } from '../styled';

const WidgetForm = ({ onSubmit, renderActions, ...initialFormValues }) => {
  const boardColumns = useSelector(
    ({ ui, boards }) => boards.boardsById[ui.currentBoard].columns
  );

  const initialValidationSchema = createValidationSchema(boardColumns);
  const typedValidationSchema = validationSchemaModificator(initialFormValues.type, initialValidationSchema)

  const { values, handleChange, handleSubmit, errors, setValidationSchema } = useFormData(initialFormValues, typedValidationSchema, true);
  const [tabValue, setTabValue] = useState(0);

  const widgetType = widgetTypes[values.type];
  const dialogFieldNames = (widgetType && widgetType.dialogFields) ? widgetType.dialogFields : [];
  const hasDialogFields = dialogFieldNames.length !== 0;

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleTypeChange = (handler) => (event) => {
    const { target: {value} } = event;

    const validationSchemaModified = validationSchemaModificator(value, initialValidationSchema)
    setValidationSchema(validationSchemaModified)

    handler(event);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate="novalidate">
      <StyledTabs 
        value={tabValue} 
        onChange={handleTabChange}
        variant="fullWidth"
      >
        <Tab label="General"/>
        {hasDialogFields && <Tab label={widgetType.name}/>}
      </StyledTabs>
      <StyledTabPanel value={tabValue} index={0}>
        <StyledFieldset component="fieldset">
          <DropdownField
            onChange={handleTypeChange(handleChange("type"))}
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
            error={errors.title !== undefined}
            FormHelperTextProps={{component: 'div'}}
            helperText={
              <StyledValidationMessages
                messages={errors.title}
                data-cy={'widget-form-title-error'}
              />}
            inputProps={{'data-cy': 'widget-form-title-input'}}
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
              inputProps={{ 'data-cy': 'widget-form-columns-input' }}
              label="Columns"
              margin="normal"
              value={values.columns}
              type="number"
              error={errors.columns !== undefined}
              FormHelperTextProps={{component: 'div'}}
              helperText={
                <StyledValidationMessages
                  messages={errors.columns}
                  data-cy={'widget-form-columns-error'}
                />}
            />
            <StyledNumberField
              onChange={handleChange('rows')}
              id="rows"
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{ 'data-cy': 'widget-form-rows-input' }}
              label="Rows"
              margin="normal"
              value={values.rows}
              type="number"
              error={errors.rows !== undefined}
              FormHelperTextProps={{component: 'div'}}
              helperText={
                <StyledValidationMessages
                  messages={errors.rows}
                  data-cy={'widget-form-rows-error'}
                />}
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
                  inputProps={{'data-cy': 'widget-form-go-new-line-checkbox'}}
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
                  inputProps={{'data-cy': 'widget-form-disable-checkbox'}}
                />
              }
              label="Disable"
            />
          </FormControl>
        </StyledFieldset>
      </StyledTabPanel>
      {hasDialogFields && 
        <StyledTabPanel value={tabValue} index={1}>
          <WidgetTypeForm
            type={values.type}
            values={values}
            errors={errors}
            handleChange={handleChange}
          />
        </StyledTabPanel>
      }
      {renderActions()}
    </form>
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