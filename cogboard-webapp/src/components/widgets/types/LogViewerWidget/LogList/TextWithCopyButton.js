import React, { useState, useRef } from 'react';

import FileCopyIcon from '@material-ui/icons/FileCopy';
import { StyledCopyButton, Text, TextWithCopyButtonContainer } from './styled';
import { Tooltip } from '@material-ui/core';

const tooltipMessages = {
  standard: 'Copy to clipboard',
  copied: 'Copied!',
  error: 'Error: could not copy'
};

const TextWithCopyButton = ({ text, ...props }) => {
  const [tooltipMsg, setTooltipMsg] = useState(tooltipMessages.standard);
  const textRef = useRef(null);

  const setStandardTooltipMsg = () =>
    setTimeout(() => setTooltipMsg(tooltipMessages.standard), 200);
  const setCopiedTooltipMsg = () => setTooltipMsg(tooltipMessages.copied);
  const setErrorTooltipMsg = () => setTooltipMsg(tooltipMessages.error);

  const handleCopy = () => {
    try {
      const selection = window.getSelection();
      selection.removeAllRanges();

      const range = document.createRange();
      range.selectNodeContents(textRef.current);

      selection.addRange(range);
      document.execCommand('copy');
      selection.removeAllRanges();
      setCopiedTooltipMsg();
    } catch (err) {
      setErrorTooltipMsg();
    }
  };

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
      <Text ref={textRef} {...props}>
        {text}
      </Text>
    </TextWithCopyButtonContainer>
  );
};

export default TextWithCopyButton;
