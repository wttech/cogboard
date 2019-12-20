import React from 'react';
import { StyledIframeEmbedWidget } from './styled';

const IframeBoard = ({ currentBoard: { iframeUrl } }) => {
  return <StyledIframeEmbedWidget iframeUrl={iframeUrl} />;
};

export default IframeBoard;
