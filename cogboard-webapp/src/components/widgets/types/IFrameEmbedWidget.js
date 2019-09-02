import React from 'react';
import {StyledIFrame} from "../../styled";

const IFrameEmbedWidget = (props) => {
    const {url} = props;

    return (
        <StyledIFrame
            url={url}
        />
    );
};

export default IFrameEmbedWidget;
