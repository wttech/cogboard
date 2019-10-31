import React, { useState, useEffect } from 'react';
import { string, number, bool } from 'prop-types';
import { useSelector } from 'react-redux';

import widgetTypes from '../widgets';
import { useFormData } from '../../hooks';

import { createWidgetValidationSchema } from './validators';

import { Tab } from '@material-ui/core';
import DynamicForm from "../DynamicForm";
import WidgetTypeForm from '../WidgetTypeForm';
import { StyledTabPanel, StyledTabs } from './styled';
import { WIDGET_TITLE_LENGTH_LIMIT, WIDGET_COLUMNS_MIN, WIDGET_ROWS_MIN, WIDGET_ROWS_MAX } from '../../constants';

const WidgetForm = ({ handleSubmit, renderActions, ...initialFormValues }) => {
  const boardColumns = useSelector(
    ({ ui, boards }) => boards.boardsById[ui.currentBoard].columns
  );

  const generalFields = ['WidgetTypeField', 'TitleField', ['ColumnFieldSm', 'RowFieldSm'], 'NewLineField', 'DisabledField'];
  const constraints = {
    'TitleField': { max: WIDGET_TITLE_LENGTH_LIMIT },
    'ColumnFieldSm': { min: WIDGET_COLUMNS_MIN, max: boardColumns },
    'RowFieldSm': { min: WIDGET_ROWS_MIN, max: WIDGET_ROWS_MAX }
  }

  const { values, handleChange, withValidation, errors, setValidationSchema } = useFormData(initialFormValues, {
    initialSchema: createWidgetValidationSchema(initialFormValues.type, generalFields, constraints),
    onChange: true
  });
  const [tabValue, setTabValue] = useState(0);

  const widgetType = widgetTypes[values.type];
  const dialogFieldNames = (widgetType && widgetType.dialogFields) ? widgetType.dialogFields : [];
  const hasDialogFields = dialogFieldNames.length !== 0;

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    const validationSchema = createWidgetValidationSchema(values.type, generalFields, constraints)
    setValidationSchema(validationSchema)
    // eslint-disable-next-line
  }, [values.type])

  return (
    <form onSubmit={withValidation(handleSubmit)} noValidate="novalidate">
      <StyledTabs 
        value={tabValue} 
        onChange={handleTabChange}
        variant="fullWidth"
      >
        <Tab label="General"/>
        {hasDialogFields && <Tab label={widgetType.name}/>}
      </StyledTabs>
      <StyledTabPanel value={tabValue} index={0}>
      <DynamicForm
          values={values}
          fields={generalFields}
          handleChange={handleChange}
          errors={errors}
          rootName='widget-form'
        />
      </StyledTabPanel>
      {hasDialogFields && 
        <StyledTabPanel value={tabValue} index={1}>
          <WidgetTypeForm
            type={values.type}
            values={values}
            errors={errors}
            handleChange={handleChange}
            rootName='widget-form'
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