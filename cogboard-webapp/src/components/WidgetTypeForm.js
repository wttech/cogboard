import React from 'react';
import { func, object, string } from 'prop-types';
import styled from '@emotion/styled/macro';

import widgetTypes from './widgets';
import dialogFields from './widgets/dialogFields';

import { Divider, FormControl } from '@material-ui/core';

const StyledDivider = styled(Divider)`
  margin-bottom: 24px;
`;

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
      <StyledDivider />
      <StyledFieldset component="fieldset">
        {dialogFieldNames.map(fieldName => {
          const {
            component: DialogField,
            initialValue = '',
            ...dialogFieldProps
          } = dialogFields[fieldName];

          const { name } = dialogFieldProps;

          if (values[name] === undefined) {
            values[name] = initialValue;
          }

          return (
            <DialogField
              key={name}
              value={values[name]}
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