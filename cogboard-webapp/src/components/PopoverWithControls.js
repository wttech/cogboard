import React, { useState } from 'react';
import copy from 'copy-to-clipboard';
import { CaptionWithPointer, StyledPopoverText } from './styled';
import { Button, Popover } from '@material-ui/core';

export const PopoverWithControls = ({ title, body, withCopy, className }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const popoverOpen = Boolean(anchorEl);

  const handleClick = event => setAnchorEl(event.currentTarget);
  const handlePopoverClose = () => setAnchorEl(null);

  const copyBody = () => copy(body);

  return (
    <>
      <CaptionWithPointer
        title={body}
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
        <StyledPopoverText>{body}</StyledPopoverText>
      </Popover>
    </>
  );
};
