import React from 'react';
import { bool, string } from 'prop-types';

import {
  TypographyVariant,
  CenterWrapper,
  StyledPre,
  RotatedStyledPre,
  OverflowingText,
  SetWidth
} from './styled';
import { useClientRect } from './hooks';

export const ModifiedWidth = (component, componentRect) => {
  if (componentRect) {
    console.log(componentRect);
    const { height } = componentRect;
    console.log(height);

    return SetWidth(component, height);
  }

  return component;
};

const TruncatedText = ({isVertical, parentRect, children}) => {
  const UniversalPre = isVertical ? RotatedStyledPre : StyledPre;
  const OverflowingPre = OverflowingText(UniversalPre);

  if (parentRect !== null) {
    const ModifiedPre = ModifiedWidth(OverflowingPre, parentRect);

    return <ModifiedPre>{children}</ModifiedPre>
  }

  return <OverflowingPre>{children}</OverflowingPre>
};

const TextWidget = ({ text, textSize, isVertical }) => {
  const [centerWrapperRect, centerWrapperRef] = useClientRect();

  return (
    <TypographyVariant variant={textSize}>
      <CenterWrapper ref={centerWrapperRef}>
        <TruncatedText
          isVertical={isVertical}
          parentRect={centerWrapperRect}
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
