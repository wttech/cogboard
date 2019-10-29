import React from 'react';
import { string } from "prop-types";
import { attachHttp } from "./helpers";

import { StyledIframe } from "../../../styled";
import { Typography } from "@material-ui/core";

const IframeEmbedWidget = ({ url }) => {
  if (url) {
    return (
      <StyledIframe
        url={attachHttp(url)}
      />
    );
  } else {
    return (
      <Typography variant="h5">
        URL is blank
      </Typography>
    );
  }
};

IframeEmbedWidget.propTypes = {
  url: string.isRequired
};

export default IframeEmbedWidget;
