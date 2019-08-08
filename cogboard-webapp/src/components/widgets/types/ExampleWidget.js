import React from 'react';

import Typography from '@material-ui/core/Typography';

const ExampleWidget = ({ serverTime }) => {
  const ts = serverTime ? new Date(serverTime).toLocaleString() : '';

  return (
    <Typography variant="caption">
      <p>{ts}</p>
    </Typography>
  );
};

export default ExampleWidget;