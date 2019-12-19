import React from 'react';
import { string } from 'prop-types';

import { attachHttp } from './helpers';

import { StyledIframe } from '../../../styled';
import { Typography } from '@material-ui/core';

const IframeEmbedWidget = ({ iframeUrl }) => {
  if (iframeUrl) {
    return <StyledIframe url={attachHttp(iframeUrl)} />;
  } else {
    return <Typography variant="h5">URL is blank</Typography>;
  }
};

IframeEmbedWidget.propTypes = {
  iframeUrl: string.isRequired
};

export default IframeEmbedWidget;
