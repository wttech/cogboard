import React from 'react';

import { Caption } from "../../styled";

const LinkListWidget = ({ serverTime }) => {
  const ts = serverTime ? new Date(serverTime).toLocaleString() : '';

  //TODO
  return (
    <Caption>
      {ts}
    </Caption>
  );
};

export default LinkListWidget;