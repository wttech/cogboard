import React from 'react';
import {StyledIframe} from "../../../styled";
import {string} from "prop-types";
import {Typography} from "@material-ui/core/index";
import {attachHttp} from "./helpers";

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
