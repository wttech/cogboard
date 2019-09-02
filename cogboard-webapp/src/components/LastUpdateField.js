import React from 'react';

const LastUpdateField = (props) => {
    const { lastUpdateTime  } = props;
    return (
        <div>
            Last update: {lastUpdateTime}
        </div>
    );
};

export default LastUpdateField;