import React from 'react';
import { bool, string } from 'prop-types';

import { Typography } from '@material-ui/core';
import { StyledPre, VerticalText } from './styled';

const TextWidget = ({ text, textSize, isVertical }) => {
  const TextVariant = isVertical ? VerticalText : Typography;

  return (
      <TextVariant variant={textSize}>
          <StyledPre>{text}</StyledPre>
      </TextVariant>
  );
};

TextWidget.propTypes = {
  text: string.isRequired,
  textSize: string.isRequired,
  isVertical: bool.isRequired
};

export default TextWidget;