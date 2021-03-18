import React from 'react';

import { StyledCardContent, StyledErrorMessage } from './styled';
import ErrorMessage from '../ErrorMessage';
import WidgetContent from '../WidgetContent';
import WidgetTypeIcon from '../WidgetTypeIcon';
import TextWidget from '../widgets/types/TextWidget';
import ZabbixWidget from '../widgets/types/ZabbixWidget';

export const mapStatusToColor = (status, theme) => theme.palette.status[status];

export const getWidgetOverflow = (type, expanded) =>
  type !== 'TextWidget' || expanded ? 'visible' : 'hidden';

export const dispatchEvent = (customEvent, data) => {
  if (customEvent) {
    const Event = new CustomEvent(customEvent, { detail: data });
    document.dispatchEvent(Event);
  }
};

const renderContent = (content, id, type, status, expandContent, expanded) => {
  return (
    <>
      {content && content.errorMessage ? (
        <ErrorMessage {...content} status={status} />
      ) : !expandContent ? (
        <WidgetContent id={id} type={type} content={content} />
      ) : expandContent ? (
        <ExpandableContent
          id={id}
          type={type}
          status={status}
          content={content}
          expanded={expanded}
        />
      ) : (
        ''
      )}
    </>
  );
};

export const renderCardContent = (
  content,
  disabled,
  id,
  type,
  status,
  expandContent,
  expanded,
  handleToggle
) => {
  if (disabled && expanded) {
    handleToggle();
  }
  return (
    <StyledCardContent type={type}>
      {disabled ? (
        <>
          <WidgetTypeIcon type={type} status={status} content={content} />
          <StyledErrorMessage status={status} variant="caption" paragraph>
            Disabled Widget
          </StyledErrorMessage>
        </>
      ) : (
        renderContent(content, id, type, status, expandContent, expanded)
      )}
    </StyledCardContent>
  );
};

const ExpandableContent = ({ id, type, status, content, expanded }) => {
  if (type !== 'TextWidget' && type !== 'ZabbixWidget') {
    return <WidgetTypeIcon type={type} status={status} content={content} />;
  } else if (type === 'ZabbixWidget') {
    return <ZabbixWidget id={id} {...content} />;
  } else {
    return !expanded ? <TextWidget {...content} singleLine={true} /> : null;
  }
};
