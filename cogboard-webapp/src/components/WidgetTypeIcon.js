import React from 'react';
import StatusIcon from './StatusIcon';
import { StyledStatusIconButton, StyledIconWrapper } from './Widget/styled';

const WidgetTypeIcon = props => {
  return props.type === 'AemHealthcheckWidget' ? (
    <StyledStatusIconButton href={props.content.url} target="_blank">
      <StatusIcon status={props.status} size="large" />
    </StyledStatusIconButton>
  ) : (
    <StyledIconWrapper>
      <StatusIcon status={props.status} size="large" />
    </StyledIconWrapper>
  );
};

export default WidgetTypeIcon;
