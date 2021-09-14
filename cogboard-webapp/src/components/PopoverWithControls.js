import React, { useState } from 'react';
import {
  SERVICE_CHECK_RESPONSES,
  NO_MATCHING_SERVICE_CHECK_RESPONSE
} from '../constants';
import copy from 'copy-to-clipboard';
import {
  CaptionWithPointer,
  StyledPopoverText,
  StyledPopoverTextWrapper,
  StyledPopoverHeader
} from './styled';
import { Button, Popover } from '@material-ui/core';

export const PopoverWithControls = ({
  title,
  titleHover,
  body,
  bodyMessage,
  expectedResponseBody,
  withCopy,
  className
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const popoverOpen = Boolean(anchorEl);

  const handleClick = event => setAnchorEl(event.currentTarget);
  const handlePopoverClose = () => setAnchorEl(null);

  const copyBody = () => copy(body);

  return (
    <>
      <CaptionWithPointer
        title={titleHover || title}
        onClick={handleClick}
        className={className}
      >
        {title}
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
        {withCopy ? <Button onClick={copyBody}>Copy</Button> : null}
        <Button onClick={handlePopoverClose}>Close</Button>
        {bodyMessage === NO_MATCHING_SERVICE_CHECK_RESPONSE ? (
          <StyledPopoverTextWrapper>
            <StyledPopoverText>
              <StyledPopoverHeader>
                {SERVICE_CHECK_RESPONSES.expected}
              </StyledPopoverHeader>
              <p>{expectedResponseBody}</p>
            </StyledPopoverText>
            <StyledPopoverText>
              <StyledPopoverHeader>
                {SERVICE_CHECK_RESPONSES.received}
              </StyledPopoverHeader>
              <p>{body}</p>
            </StyledPopoverText>
          </StyledPopoverTextWrapper>
        ) : (
          <StyledPopoverText>
            <p>{body}</p>
          </StyledPopoverText>
        )}
      </Popover>
    </>
  );
};
