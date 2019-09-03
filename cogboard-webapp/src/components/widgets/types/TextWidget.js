import React from 'react';

import Typography from '@material-ui/core/Typography';
import {bool, string} from "prop-types";
import styled from '@emotion/styled/macro';

const VerticalText = styled(Typography)`
  transform: rotate(-90deg);
  -webkit-transform: rotate(-90deg);
  -moz-transform: rotate(-90deg);
  -ms-transform: rotate(-90deg);
`;

const TextWidget = props => {
  const {text, textSize, isVertical} = props;

  if (isVertical) {
    return (
        <VerticalText variant={textSize}>
          {text}
        </VerticalText>
    );
  } else {
    return (
        <Typography variant={textSize}>
          {text}
        </Typography>
    );
  }
};

TextWidget.propTypes = {
  text: string.isRequired,
  textSize: string.isRequired,
  isVertical: bool
};

export default TextWidget;