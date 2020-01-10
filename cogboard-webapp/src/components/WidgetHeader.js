import React from 'react';
import { bool, object } from 'prop-types';

import { StyledCardHeader, StyledEmptyCardHeader } from './Widget/styled';

const WidgetHeader = ({ isEmptyHeader, ...other }) => {
  if (isEmptyHeader) {
    return <StyledEmptyCardHeader {...other} />;
  }

  return <StyledCardHeader {...other} />;
};

WidgetHeader.propTypes = {
  isEmptyHeader: bool.isRequired,
  otherProps: object
};

export default WidgetHeader;
