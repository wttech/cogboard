import React from 'react';
import { elementType, func, string } from 'prop-types';

const ConditionallyHidden = (Component, conditionField, condition) => ({
  values,
  ...other
}) => {
  if (values[conditionField] === undefined) {
    return null;
  }

  return condition(values[conditionField]) ? (
    <Component values={values} {...other} />
  ) : null;
};

ConditionallyHidden.propTypes = {
  Component: elementType,
  condition: func,
  conditionField: string
};

export default ConditionallyHidden;
