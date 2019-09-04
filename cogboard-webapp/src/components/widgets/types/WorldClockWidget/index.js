import React, {useState} from 'react';
import Typography from "@material-ui/core/Typography/index";

import {useInterval} from '../../../../hooks'
import {getDate} from "./helpers";

const WorldClockWidget = props => {
    const {timeZoneId, dateFormat} = props;

    let date = getDate(timeZoneId, dateFormat);
    let [datetime, setDateTime] = useState(date);

    useInterval(() => {
        setDateTime(getDate(timeZoneId, dateFormat));
    }, 1000);

    return (
        <Typography>
           {datetime}
        </Typography>
    );
};

export default WorldClockWidget;
