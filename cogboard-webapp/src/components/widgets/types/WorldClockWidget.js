import React, {useState} from 'react';
import {useInterval} from '../../helpers/interval'
import moment from 'moment-timezone'
import {Caption} from "../../styled";

const WorldClockWidget = props => {
    const {timeZoneId, dateFormat} = props;

    const getDate = (timezone, format) => {
        return moment.tz(new Date(), timezone).format(format);
    };

    let datetime = getDate(timeZoneId, dateFormat);
    let [date, setDateTime] = useState(datetime);

    useInterval(() => {
        setDateTime(getDate(timeZoneId, dateFormat));
    }, 1000);

    return (
        <Caption>
            Time in {timeZoneId} : {date}
        </Caption>
    );
};

export default WorldClockWidget;