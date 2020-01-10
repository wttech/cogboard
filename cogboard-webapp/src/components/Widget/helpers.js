import React from 'react';

import { StyledCardContent } from './styled';
import ErrorMessage from '../ErrorMessage';
import WidgetContent from '../WidgetContent';
import WidgetTypeIcon from '../WidgetTypeIcon';
import WidgetFooter from '../WidgetFooter';
import TextWidget from '../widgets/types/TextWidget';

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
    <StyledCardContent>
      {content && content.errorMessage ? (
        <ErrorMessage {...content} />
      ) : !disabled && !expandContent ? (
        <WidgetContent id={id} type={type} content={content} />
      ) : expandContent ? (
        <ExpandableContent
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

const ExpandableContent = ({ type, status, content, expanded }) => {
  if (type !== 'TextWidget') {
    return <WidgetTypeIcon type={type} status={status} content={content} />;
  } else {
    return !expanded ? <TextWidget {...content} singleLine={true} /> : null;
  }
};
