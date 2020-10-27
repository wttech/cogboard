import React from 'react';

import { StyledCardContent } from './styled';
import ErrorMessage from '../ErrorMessage';
import WidgetContent from '../WidgetContent';
import WidgetTypeIcon from '../WidgetTypeIcon';
import WidgetFooter from '../WidgetFooter';
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

export const renderCardContent = (
  content,
  updateTimestamp,
  disabled,
  id,
  type,
  status,
  expandContent,
  expanded,
  handleToggle,
  closeWidgets
) => {
  return (
    <StyledCardContent type={type}>
      {content && content.errorMessage ? (
        <ErrorMessage {...content} status={status} />
      ) : !disabled && !expandContent ? (
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
        'Disabled'
      )}
      <WidgetFooter
        updateTimestamp={updateTimestamp}
        expanded={expanded}
        handleToggle={handleToggle}
        content={content}
        expandContent={expandContent}
        closeWidgets={closeWidgets}
        id={id}
      />
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
