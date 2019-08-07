import React from 'react';
import {Typography} from "@material-ui/core";


const ServiceCheckWidget = props => {
  const {statusCode, statusMessage, timestamp } = props;
  const ts = timestamp ? new Date(timestamp).toLocaleString() : '';

  return (
    <>
      <Typography
        variant="caption">
        <p>{ts}</p>
        <p>{statusMessage}</p>
      </Typography>
      <Typography
        variant="h4">
        {statusCode}
      </Typography>
    </>
  );
};

export default ServiceCheckWidget;