import React from 'react';
import { string } from 'prop-types';
import { attachHttp } from './helpers';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { StyledIframe } from '../../../styled';
import { StyledNoItemsInfo } from '../../../Widget/styled';

const IframeEmbedWidget = ({ iframeUrl, className }) => {
  return (
    <>
      {iframeUrl ? (
        <StyledIframe className={className} url={attachHttp(iframeUrl)} />
      ) : (
        <StyledNoItemsInfo>
          <InfoOutlinedIcon fontSize="large" />
          <p>URL is blank</p>
        </StyledNoItemsInfo>
      )}
    </>
  );
};

IframeEmbedWidget.propTypes = {
  iframeUrl: string.isRequired
};

export default IframeEmbedWidget;
