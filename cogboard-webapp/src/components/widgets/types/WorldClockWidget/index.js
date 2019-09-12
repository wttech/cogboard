import React, {useState} from 'react';
import {Typography} from "@material-ui/core";

import {useInterval} from '../../../../hooks'
import {getDate} from "./helpers";
import {StyledPre} from "../TextWidget/styled";


const WorldClockWidget = props => {
    const { timeZoneId, dateFormat, textSize } = props;

    let date = getDate(timeZoneId, dateFormat);
    let [datetime, setDateTime] = useState(date);

    useInterval(() => {
        setDateTime(getDate(timeZoneId, dateFormat));
    }, 1000);

    return (
      <Typography variant={textSize}>
          <StyledPre>{datetime}</StyledPre>
      </Typography>
    );
};

export default WorldClockWidget;
