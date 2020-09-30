import React, { useRef } from 'react';
import { useSize } from 'react-hook-size';
import { bool, string } from 'prop-types';

import {
  TypographyVariant,
  CenterWrapper,
  StyledPre,
  RotatedStyledPre,
  OverflowingText,
  SingleLineText,
  SetWidth
} from './styled';

export const ModifiedWidth = (component, height) => {
  if (height) {
    return SetWidth(component, height);
  }

  return component;
};

const TruncatedText = ({
  isVertical,
  parentDimensions,
  children,
  singleLine
}) => {
  let TruncatedPre = null;

  if (isVertical && parentDimensions !== null) {
    const { height } = parentDimensions;
    const ModifiedPre = ModifiedWidth(RotatedStyledPre, height);

    TruncatedPre = OverflowingText(ModifiedPre);
  } else if (singleLine) {
    TruncatedPre = SingleLineText(StyledPre);
  } else {
    TruncatedPre = OverflowingText(StyledPre);
  }

  return <TruncatedPre>{children}</TruncatedPre>;
};

const TextWidget = ({ text, textSize, isVertical, singleLine }) => {
  const targetRef = useRef();
  const centerWrapperDimensions = useSize(targetRef);

  return (
    <TypographyVariant variant={textSize}>
      <CenterWrapper ref={targetRef} isVertical={isVertical}>
        <TruncatedText
          isVertical={isVertical}
          parentDimensions={centerWrapperDimensions}
          singleLine={singleLine}
        >
          {text}
        </TruncatedText>
      </CenterWrapper>
    </TypographyVariant>
  );
};

TextWidget.propTypes = {
  text: string,
  textSize: string,
  isVertical: bool,
  singleLine: bool
};

TextWidget.defaultProps = {
  text: '',
  textSize: '',
  isVertical: false,
  singleLine: false
};

export default TextWidget;
