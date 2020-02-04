import React from 'react';
import {string} from 'prop-types';
import styled from '@emotion/styled/macro';

const StyledDiv = styled.div`
  height: 100%;
  position: relative;
`;

const StyledImg = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  display: block;
  object-fit: cover;
  object-position: center;
`;

const CatsWidget = ({imageUrl}) => {
  return (
    <StyledDiv>
      <StyledImg
        alt="Cute Kitty"
        src={imageUrl}
      />
    </StyledDiv>
  );
};

CatsWidget.propTypes = {
  imageUrl: string.isRequired
};

export default CatsWidget;
