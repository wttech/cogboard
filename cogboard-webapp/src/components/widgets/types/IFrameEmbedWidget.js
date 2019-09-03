import React from 'react';
import {StyledIFrame} from "../../styled";
import {string} from "prop-types";

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
