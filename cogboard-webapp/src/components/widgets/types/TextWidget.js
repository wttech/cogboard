import React from 'react';
import { bool, string } from "prop-types";

import Typography from '@material-ui/core/Typography';
import styled from '@emotion/styled/macro';

const VerticalText = styled(Typography)`
  transform: rotate(-90deg);
  -webkit-transform: rotate(-90deg);
  -moz-transform: rotate(-90deg);
  -ms-transform: rotate(-90deg);
`;

const TextWidget = props => {
  const {text, textSize, isVertical} = props;
  const TextVariant = isVertical ? VerticalText : Typography;

  return (
      <TextVariant variant={textSize}>
          <pre style={{fontFamily: 'inherit'}}>
            {text}
          </pre>
      </TextVariant>
  );
};

TextWidget.propTypes = {
  text: string.isRequired,
  textSize: string.isRequired,
  isVertical: bool
};

export default TextWidget;