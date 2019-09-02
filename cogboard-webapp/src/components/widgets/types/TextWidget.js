import React from 'react';

import Typography from '@material-ui/core/Typography';

const TextWidget = ({text}) => {
  return (
      <Typography variant="caption">
        <pre style={{ fontFamily: 'inherit' }}>
          {text}
        </pre>
      </Typography>
  );
};

export default TextWidget;