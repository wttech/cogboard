import React from 'react';

import Typography from '@material-ui/core/Typography';

const ExampleWidgetContent = ({ serverTime }) => {
  return (
    <Typography color="textPrimary" variant="subtitle2">
      {serverTime}
    </Typography>
  );
};

export default ExampleWidgetContent;