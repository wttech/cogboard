import React from 'react';
import { string, number } from 'prop-types';

import { Typography } from "@material-ui/core";
import { Caption, WidgetButton } from "../../styled";
import Loader from '../../Loader';

const ServiceCheckWidget = props => {
  const { statusCode, statusMessage, expectedStatusCode, body, expectedResponseBody, url, errorMessage } = props;
  const error =  expectedStatusCode !== statusCode;
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
  body: string,
  expectedResponseBody: string,
  errorMessage: string
};

ServiceCheckWidget.defaultProps = {
  statusCode: 0,
  statusMessage: '',
  errorMessage: '',
  expectedStatusCode: 200,
  body: '',
  expectedResponseBody: '',
  timestamp: 0,
};

export default ServiceCheckWidget;