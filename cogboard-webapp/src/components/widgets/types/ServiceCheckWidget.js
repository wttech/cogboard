import React from 'react';
import { string, number } from 'prop-types';

import { Typography } from "@material-ui/core";
import { Caption, FullWidthButtonOutlined } from "../../styled";

const ServiceCheckWidget = props => {
  const { statusCode, statusMessage, timestamp, expectedStatusCode, url, errorMessage } = props;
  const ts = timestamp ? new Date(timestamp).toLocaleString() : '';
  const error = expectedStatusCode !== statusCode;
  const statusCodeMessage = error ? `${expectedStatusCode} expected, got ${statusCode}` : statusCode;

  return (
    errorMessage === '' ?
      <>
        <Caption>
          {ts}
        </Caption>
        {error &&
          <Caption>
            {statusMessage}
          </Caption>
        }
        <FullWidthButtonOutlined href={url}>
          {statusCodeMessage}
        </FullWidthButtonOutlined>
      </>
      :
      <Typography variant="h5">
        {errorMessage}
      </Typography>
  );
};

ServiceCheckWidget.propTypes = {
  statusCode: number.isRequired,
  statusMessage: string,
  timestamp: number.isRequired,
  expectedStatusCode: number.isRequired,
  errorMessage: string
};

ServiceCheckWidget.defaultProps = {
  statusMessage: '',
  errorMessage: ''
};

export default ServiceCheckWidget;