import React from 'react';

import { Caption } from '../../styled';

const ExampleWidget = ({ lastUpdated }) => {
  const ts = lastUpdated ? new Date(lastUpdated).toLocaleString() : '';

  return <Caption>{ts}</Caption>;
};

export default ExampleWidget;
