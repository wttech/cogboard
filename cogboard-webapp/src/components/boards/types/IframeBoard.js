import React from 'react';
import styled from '@emotion/styled/macro';

import IframeEmbedWidget from '../../widgets/types/IframeEmbedWidget';

const StyledIframeEmbedWidget = styled(IframeEmbedWidget)`
  width: 100%;
  color: black;
  height: calc(100vh - 142px);
`;

const IframeBoard = ({ currentBoard: { iframeUrl } }) => {
  return <StyledIframeEmbedWidget iframeUrl={iframeUrl} />;
};

export default IframeBoard;
