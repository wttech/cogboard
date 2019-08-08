import React from 'react';

import { Typography } from "@material-ui/core";

const ServiceCheckWidget = props => {
  const {statusCode, statusMessage, timestamp, expectedStatusCode } = props;
  const ts = timestamp ? new Date(timestamp).toLocaleString() : '';
  const error = expectedStatusCode !== statusCode;
  const statusCodeMessage = error ? `${expectedStatusCode} expected, got ${statusCode}` : statusCode;

  return (
    <>
      <Typography variant="caption">
        <p>{ts}</p>
      </Typography>
      <Typography variant="h6">
        {statusCodeMessage}
      </Typography>
      {error &&
      <Typography variant="caption">
        {statusMessage}
      </Typography>
      }
    </>
  );
};

export default ServiceCheckWidget;