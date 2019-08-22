import React from 'react';

import Typography from '@material-ui/core/Typography';

const TextWidget = ({text}) => {
  const ts = text ? text.toString() : '';

  return (
      <Typography variant="caption">
        <p>{ts}</p>
      </Typography>
  );
};

export default TextWidget;