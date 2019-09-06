import React from 'react';
import { string, number } from 'prop-types';

import { Typography } from "@material-ui/core";
import { Caption, WidgetButton } from "../../styled";
import Loader from '../../Loader';

const ServiceCheckWidget = props => {
  const { statusCode, statusMessage, timestamp, expectedStatusCode, url, errorMessage } = props;
  const ts = timestamp ? new Date(timestamp).toLocaleString() : '';
  const error = expectedStatusCode !== statusCode;
  const statusCodeMessage = error ? `${expectedStatusCode} expected, got ${statusCode}` : statusCode;

  if (errorMessage) {
    return (
      <Typography variant="h5">
        {errorMessage}
      </Typography>
    );
  }

  return (
    <>
      <Caption>
        {ts}
      </Caption>
      {error &&
        <Caption>
          {statusMessage}
        </Caption>
      }
      <WidgetButton href={url}>
        {!statusCode ? <Loader text='Pending update' size={20} /> : statusCodeMessage}
      </WidgetButton>
    </>
  );
};

ServiceCheckWidget.propTypes = {
  statusCode: number,
  statusMessage: string,
  timestamp: number,
  expectedStatusCode: number,
  errorMessage: string
};

ServiceCheckWidget.defaultProps = {
  statusCode: 0,
  statusMessage: '',
  errorMessage: '',
  expectedStatusCode: 200,
  timestamp: 0,
};

export default ServiceCheckWidget;