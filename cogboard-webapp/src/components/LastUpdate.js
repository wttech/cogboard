import React from 'react';
import {Typography} from "@material-ui/core";

const LastUpdate = ({ lastUpdateTime }) => {
    return (
        <Typography align='left' color='textSecondary' variant='caption' gutterBottom={false}>
            Last update: {lastUpdateTime}
        </Typography>
    );
};

export default LastUpdate;