import React from 'react';
import {string} from 'prop-types';
import styled from '@emotion/styled/macro';

const StyledImg = styled.img`
  max-height: 495px;
`;

const CatsWidget = ({imageUrl}) => {
  return (
    <StyledImg
      alt="Cute Kitty"
      src={imageUrl}
    />
  );
};

CatsWidget.propTypes = {
  imageUrl: string.isRequired
};

export default CatsWidget;
