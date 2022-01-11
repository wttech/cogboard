import React, { useState } from 'react';

import FileCopyIcon from '@material-ui/icons/FileCopy';
import { StyledCopyButton, Text, TextWithCopyButtonContainer } from './styled';
import { Tooltip } from '@material-ui/core';

const tooltipMessages = {
  standard: 'Copy to clipboard',
  copied: 'Copied!'
};

const TextWithCopyButton = ({ text, ...props }) => {
  const [tooltipMsg, setTooltipMsg] = useState(tooltipMessages.standard);

  const setStandardTooltipMsg = () =>
    setTimeout(() => setTooltipMsg(tooltipMessages.standard), 200);

  const setCopiedTooltipMsg = () => setTooltipMsg(tooltipMessages.copied);

  const handleCopy = () =>
    navigator.clipboard.writeText(text).then(() => setCopiedTooltipMsg());

  return (
    <TextWithCopyButtonContainer>
      <Tooltip placement="right" title={tooltipMsg}>
        <StyledCopyButton
          onMouseLeave={setStandardTooltipMsg}
          onClick={e => {
            e.stopPropagation();
            handleCopy();
          }}
        >
          <FileCopyIcon fontSize="inherit" />
        </StyledCopyButton>
      </Tooltip>
      <Text {...props}>{text}</Text>
    </TextWithCopyButtonContainer>
  );
};

export default TextWithCopyButton;
