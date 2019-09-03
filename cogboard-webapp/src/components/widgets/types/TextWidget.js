import React from 'react';

import Typography from '@material-ui/core/Typography';
import {Requireable as string} from "prop-types";

const TextWidget = props => {
  const { text, textSize } = props;
  return (
      <Typography variant={textSize}>
        <pre style={{ fontFamily: 'inherit' }}>
          {text}
        </pre>
      </Typography>
  );
};

TextWidget.propTypes = {
  text: string.isRequired,
  textSize: string.isRequired
};

export default TextWidget;