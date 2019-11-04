import React from 'react';
import { node, func, string } from 'prop-types';

const conditionallyHidden = ( Component, conditionField, condition ) => ({ values, ...other }) => {
  if (values[conditionField] === undefined) {
    return null;
  }

  return (
    condition(values[conditionField]) ? 
      <Component values={values} {...other}/> : null
  )
}

conditionallyHidden.propTypes = {
  Component: node,
  condition: func,
  conditionField: string
}

export default conditionallyHidden;