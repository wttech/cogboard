import React from 'react';
import StatusIcon from './StatusIcon';
import { StyledStatusIconButton, StyledIconWrapper } from './Widget/styled';

const WidgetTypeIcon = props => {
  const { type, content, status } = props;
  return type === 'AemHealthcheckWidget' ? (
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
