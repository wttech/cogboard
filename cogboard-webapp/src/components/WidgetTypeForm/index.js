import React from 'react';
import { func, object, string } from 'prop-types';
import styled from '@emotion/styled/macro';

import { createValueRef } from './helpers';
import widgetTypes from '../widgets';
import dialogFields from '../widgets/dialogFields';

import { Divider, FormControl } from '@material-ui/core';

const StyledDivider = styled(Divider)`
  margin-bottom: 24px;
`;

const StyledFieldset = styled(FormControl)`
  display: flex;
  margin-bottom: 32px;
  min-width: 300px;
`;

const WidgetTypeForm = ({ values, type, handleChange, handleChangeWithValue }) => {
  const widgetType = widgetTypes[type];
  const dialogFieldNames = (widgetType && widgetType.dialogFields) ? widgetType.dialogFields : [];
  const hasDialogFields = dialogFieldNames.length !== 0;

  return hasDialogFields && (
    <>
      <StyledDivider />
      <StyledFieldset component="fieldset">
        {dialogFieldNames.map(fieldName => {
          const {
            component: DialogField,
            initialValue = '',
            ...dialogFieldProps
          } = dialogFields[fieldName];

          const { name } = dialogFieldProps;
          const valueRef = createValueRef(values, initialValue, name);

          return (
            <DialogField
              key={name}
              value={valueRef}
              onChange={handleChange(name)}
              handleChangeWithValue={handleChangeWithValue(name)}
              {...dialogFieldProps}
            />
          );
        })}
      </StyledFieldset>
    </>
  );
};

WidgetTypeForm.propTypes = {
  handleChange: func.isRequired,
  type: string.isRequired,
  values: object.isRequired
};

export default WidgetTypeForm;