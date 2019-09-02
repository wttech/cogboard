import React from 'react';
import Iframe from 'react-iframe'

const IFrameEmbedWidget = (props) => {
  const {url} = props;

  return (
      <Iframe url="https://www.youtube.com/embed/zTVV7CrZxXk"
              position="absolute"
              width="100%"
              height="100%"
              allowFullScreen
      />
  );
};

export default IFrameEmbedWidget;
