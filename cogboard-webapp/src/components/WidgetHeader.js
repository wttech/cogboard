import React from 'react';
import { bool, object } from 'prop-types';

import { StyledCardHeader, StyledEmptyCardHeader } from './Widget/styled';

const WidgetHeader = ({ isEmptyHeader, ...otherProps }) => {
  if (isEmptyHeader) {
    return <StyledEmptyCardHeader {...otherProps} />;
  }

  return <StyledCardHeader {...otherProps} />;
};

WidgetHeader.propTypes = {
  isEmptyHeader: bool.isRequired,
  otherProps: object
};

export default WidgetHeader;
