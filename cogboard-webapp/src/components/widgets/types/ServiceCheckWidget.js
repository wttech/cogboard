import React, {useState} from 'react';
import { string, number } from 'prop-types';

import { Popover } from "@material-ui/core";
import { Caption, CaptionWithPointer, WidgetButton, StyledPopoverText } from "../../styled";
import Loader from '../../Loader';

const ServiceCheckWidget = props => {
  const { statusCode, statusMessage, expectedStatusCode, body, expectedResponseBody, url } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const errorStatus =  expectedStatusCode !== statusCode;
  const statusCodeMessage = errorStatus ? `${expectedStatusCode} expected, got ${statusCode}` : statusCode;
  const errorBody = !expectedResponseBody && expectedResponseBody !== body;
  const bodyMessage = errorBody ? 'FAIL' : 'OK';

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const popoverOpen = Boolean(anchorEl);

  return (
    <>
      {errorStatus &&
        <Caption>
          {statusMessage}
        </Caption>
      }
      <Caption>
        <WidgetButton href={url}>
          {!statusCode ? <Loader text='Pending update' size={20} /> : statusCodeMessage}
        </WidgetButton>
      </Caption>

      {expectedResponseBody &&
        <>
          <CaptionWithPointer
            title={body}
            onClick={handleClick}
          >
            Response: {bodyMessage}
          </CaptionWithPointer>
          <Popover
            open={popoverOpen}
            onClose={handlePopoverClose}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <StyledPopoverText>{body}</StyledPopoverText>
          </Popover>
        </>
      }
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
  timestamp: 0,
};

export default ServiceCheckWidget;