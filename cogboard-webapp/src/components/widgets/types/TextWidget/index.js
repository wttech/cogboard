import React, { useRef } from 'react';
import { useSize } from 'react-hook-size';
import { bool, string } from 'prop-types';

import {
  TypographyVariant,
  CenterWrapper,
  StyledPre,
  RotatedStyledPre,
  OverflowingText,
  SetWidth
} from './styled';

export const ModifiedWidth = (component, height) => {
  if (height) {
    return SetWidth(component, height);
  }

  return component;
};

const TruncatedText = ({ isVertical, parentDimensions, children }) => {
  let TruncatedPre = null;

  if (isVertical && parentDimensions !== null) {
    const { height } = parentDimensions;
    const ModifiedPre = ModifiedWidth(RotatedStyledPre, height);
    TruncatedPre = OverflowingText(ModifiedPre);
  } else {
    TruncatedPre = OverflowingText(StyledPre);
  }

  return <TruncatedPre>{children}</TruncatedPre>;
};

const TextWidget = ({ text, textSize, isVertical }) => {
  const targetRef = useRef();
  const centerWrapperDimensions = useSize(targetRef);

  return (
    <TypographyVariant variant={textSize}>
      <CenterWrapper ref={targetRef} isVertical={isVertical}>
        <TruncatedText
          isVertical={isVertical}
          parentDimensions={centerWrapperDimensions}
        >
          {text}
        </TruncatedText>
      </CenterWrapper>
    </TypographyVariant>
  );
};

TextWidget.propTypes = {
  text: string.isRequired,
  textSize: string.isRequired,
  isVertical: bool.isRequired
};

export default TextWidget;
