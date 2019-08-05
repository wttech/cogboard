import React from 'react';
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

const WidgetTypeForm = ({values, type = 'DefaultWidget', handleChange, initialData}) => {
  const fieldNames = widgetTypes[type].dialogFields || [];
  const noDialogFields = fieldNames.length === 0;

  return !noDialogFields && (
    <>
      <StyledDivider />
      <StyledFieldset component="fieldset">
        {fieldNames.map(field => {
          const { component: Field, ...customProps } = dialogFields[field];
          const { name } = customProps;
          const { [name]: initialValue = '' } = initialData;

          return (
            <Field
              key={name}
              value={values[name] || initialValue}
              onChange={handleChange(name)}
              {...customProps}
            />
          );
        })}
      </StyledFieldset>
    </>
  );
};

export default WidgetTypeForm;