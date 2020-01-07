import React from 'react';
import { string, number } from 'prop-types';

import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { Caption, WidgetButton } from '../../styled';
import Loader from '../../Loader';
import styled from '@emotion/styled/macro';
import { PopoverWithControls } from '../../PopoverWithControls';

const StyledOpenInNewIcon = styled(OpenInNewIcon)`
  font-size: 20px;
  margin-left: 10px;
  opacity: 0.5;
`;

const ServiceCheckWidget = ({
  body,
  expectedResponseBody,
  expectedStatusCode,
  statusCode,
  statusMessage,
  url
}) => {
  const errorStatus = expectedStatusCode !== statusCode;
  const statusCodeMessage = errorStatus
    ? `${expectedStatusCode} expected, got ${statusCode}`
    : statusCode;
  const bodyMessage = !expectedResponseBody
    ? 'OK'
    : body.includes(expectedResponseBody)
    ? 'MATCH'
    : 'NO MATCH';

  return (
    <>
      {errorStatus && <Caption>{statusMessage}</Caption>}
      <PopoverWithControls
        title={`Response: ${bodyMessage}`}
        body={body}
        withCopy={true}
      />
      <WidgetButton href={url}>
        {!statusCode ? (
          <Loader text="Pending update" size={20} />
        ) : (
          statusCodeMessage
        )}
        <StyledOpenInNewIcon />
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
  expectedResponseBody: string
};

ServiceCheckWidget.defaultProps = {
  statusCode: 0,
  statusMessage: '',
  expectedStatusCode: 200,
  body: '',
  expectedResponseBody: '',
  timestamp: 0
};

export default ServiceCheckWidget;
