import React, {useState} from 'react';
import {useInterval} from '../../../hooks'
import moment from 'moment-timezone'
import Typography from "@material-ui/core/Typography";

const WorldClockWidget = props => {
    const {timeZoneId, dateFormat} = props;

    const getDate = (timezone, format) => {
        return moment.tz(new Date(), timezone).format(format);
    };

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
