import React from 'react';

import { Caption } from "../../styled";

const ExampleWidget = ({ serverTime }) => {
  const ts = serverTime ? new Date(serverTime).toLocaleString() : '';

  return (
    <Caption>
      {ts}
    </Caption>
  );
};

export default ExampleWidget;