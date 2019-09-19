import React from 'react';
import styled from '@emotion/styled/macro';

const DragCard = ({ className }) => (
  <div className={className}></div>
)

export default styled(DragCard)`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  background-color: #353b61;
  z-index: 10;
  border: 2px solid #555a77;
  border-radius: 10px;
`