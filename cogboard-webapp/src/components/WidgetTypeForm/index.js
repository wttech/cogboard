import React from 'react';
import { func, object, string } from 'prop-types';
import styled from '@emotion/styled/macro';

import { createValueRef } from './helpers';
import widgetTypes from '../widgets';
import dialogFields from '../widgets/dialogFields';

import { FormControl } from '@material-ui/core';

const StyledFieldset = styled(FormControl)`
  display: flex;
  margin-bottom: 32px;
  min-width: 300px;
`;

const WidgetTypeForm = ({ values, type, handleChange }) => {
  const widgetType = widgetTypes[type];
  const dialogFieldNames = (widgetType && widgetType.dialogFields) ? widgetType.dialogFields : [];
  const hasDialogFields = dialogFieldNames.length !== 0;

  return hasDialogFields && (
    <>
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