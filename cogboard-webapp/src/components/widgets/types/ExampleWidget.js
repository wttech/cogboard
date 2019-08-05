import React from 'react';

import Typography from '@material-ui/core/Typography';

const ExampleWidget = ({ serverTime }) => {
  return (
    <Typography color="textPrimary" variant="subtitle2">
      {serverTime}
    </Typography>
  );
};

export default ExampleWidget;