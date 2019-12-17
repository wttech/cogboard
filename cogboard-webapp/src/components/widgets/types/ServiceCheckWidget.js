import React, { useState, useRef } from 'react';
import { string, number } from 'prop-types';

import { Popover, Button, Modal } from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import {
  Caption,
  CaptionWithPointer,
  WidgetButton,
  StyledPopoverText
} from '../../styled';
import Loader from '../../Loader';
import styled from '@emotion/styled/macro';

const StyledOpenInNewIcon = styled(OpenInNewIcon)`
  font-size: 20px;
  margin-left: 10px;
  opacity: 0.5;
`;

const ServiceCheckWidget = props => {
  const {
    statusCode,
    statusMessage,
    expectedStatusCode,
    body,
    expectedResponseBody,
    url
  } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const errorStatus = expectedStatusCode !== statusCode;
  const statusCodeMessage = errorStatus
    ? `${expectedStatusCode} expected, got ${statusCode}`
    : statusCode;
  const bodyMessage = !expectedResponseBody
    ? 'OK'
    : body.includes(expectedResponseBody)
    ? 'MATCH'
    : 'NOT MATCH';

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const popoverOpen = Boolean(anchorEl);

  const handleCopyResponse = () => {
    navigator.clipboard.writeText(body);
  };

  return (
    <>
      {errorStatus && <Caption>{statusMessage}</Caption>}
      <Caption>
        <WidgetButton href={url}>
          {!statusCode ? (
            <Loader text="Pending update" size={20} />
          ) : (
            statusCodeMessage
          )}
          <StyledOpenInNewIcon />
        </WidgetButton>
      </Caption>
      <CaptionWithPointer title={body} onClick={handleClick}>
        ⯆ Response: {bodyMessage}
      </CaptionWithPointer>
      <Popover
        open={popoverOpen}
        onClose={handlePopoverClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <Button onClick={handleCopyResponse}>Copy</Button>
        <Button onClick={handlePopoverClose}>Close</Button>
        <StyledPopoverText>{body}</StyledPopoverText>
      </Popover>
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
