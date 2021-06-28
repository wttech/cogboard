import React, { useState } from 'react';
import copy from 'copy-to-clipboard';
import {
  CaptionWithPointer,
  StyledPopoverText,
  StyledPopoverTextWrapper,
  StyledPopoverHeader
} from './styled';
import { Button, Popover } from '@material-ui/core';

const NO_MATCHING_RESPONSE = 'NO MATCH';
const RECEIVED_RESPONSE = 'ACTUAL RESPONSE';
const EXPECTED_RESPONSE = 'EXPECTED RESPONSE';

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
        {bodyMessage === NO_MATCHING_RESPONSE ? (
          <StyledPopoverTextWrapper>
            <StyledPopoverText>
              <StyledPopoverHeader>{EXPECTED_RESPONSE}</StyledPopoverHeader>
              {expectedResponseBody}
            </StyledPopoverText>
            <StyledPopoverText>
              <StyledPopoverHeader>{RECEIVED_RESPONSE}</StyledPopoverHeader>
              {body}
            </StyledPopoverText>
          </StyledPopoverTextWrapper>
        ) : (
          <StyledPopoverText>{body}</StyledPopoverText>
        )}
      </Popover>
    </>
  );
};
