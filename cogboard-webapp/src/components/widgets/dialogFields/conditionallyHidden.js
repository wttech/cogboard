import React from 'react';
import { node } from 'prop-types';

const conditionallyHidden = (Component, conditionField, condition) => ({values, ...other }) => {
  if (values[conditionField] === undefined) {
    return null;
  }

  return (
    condition(values[conditionField]) ? 
      <Component values={values} {...other}/> : null
  )
}

conditionallyHidden.propTypes = {
  component: node
}

export default conditionallyHidden;