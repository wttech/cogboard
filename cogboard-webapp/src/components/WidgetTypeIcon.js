import React from 'react';
import StatusIcon from './StatusIcon';
import { StyledStatusIconButton, StyledIconWrapper } from './Widget/styled';

const WidgetTypeIcon = ({ content, status }) => {
  return content && content.url && status !== 'DISABLED' ? (
    <StyledStatusIconButton href={content.url} target="_blank">
      <StatusIcon status={status} size="large" />
    </StyledStatusIconButton>
  ) : (
    <StyledIconWrapper>
      <StatusIcon status={status} size="large" />
    </StyledIconWrapper>
  );
};

export default WidgetTypeIcon;
