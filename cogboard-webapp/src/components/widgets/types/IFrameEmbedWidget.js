import React from 'react';
import {StyledIFrame} from "../../styled";
import {string} from "prop-types";
import IFrameEmbed from "../../IFrameEmbed";

const IFrameEmbedWidget = (props) => {
    const {url} = props;

    return (
        <StyledIFrame
            url={url}
        />
    );
};

IFrameEmbedWidget.propTypes = {
    url: string.isRequired
};


export default IFrameEmbedWidget;
