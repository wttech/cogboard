import React from 'react';
import Iframe from 'react-iframe'
import {string} from "prop-types";

const IframeEmbed = (props) => {
    const {url} = props;

    return (
        <Iframe
            {...props}
            url={url}
        />
    );
};

IframeEmbed.propTypes = {
    url: string.isRequired
};

export default IframeEmbed;
