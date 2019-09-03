import React from 'react';
import Iframe from 'react-iframe'
import {string} from "prop-types";

const IFrameEmbed = (props) => {
    const {url} = props;

    return (
        <Iframe
            {...props}
            url={url}
        />
    );
};

IFrameEmbed.propTypes = {
    url: string.isRequired
};

export default IFrameEmbed;
