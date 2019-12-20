import React from 'react';

import { StyledCardContent } from './styled';
import ErrorMessage from '../ErrorMessage';
import WidgetContent from '../WidgetContent';
import WidgetTypeIcon from '../WidgetTypeIcon';
import WidgetFooter from '../WidgetFooter';
export const mapStatusToColor = (status, theme) => theme.palette.status[status];

export const getWidgetOverflow = type =>
  type !== 'TextWidget' ? 'visible' : 'hidden';

export const getWidgetPadding = type =>
  type === 'WorldClockWidget' ? '0' : '16px';

export const renderCardContent = (
  content,
  updateTimestamp,
  disabled,
  id,
  type,
  status,
  expandContent,
  expanded,
  handleToggle
) => {
  return (
    <StyledCardContent>
      {content && content.errorMessage ? (
        <ErrorMessage {...content} />
      ) : !disabled && !expandContent ? (
        <WidgetContent id={id} type={type} content={content} />
      ) : expandContent ? (
        <WidgetTypeIcon
          type={type}
          status={status}
          content={content}
        ></WidgetTypeIcon>
      ) : (
        'Disabled'
      )}
      <WidgetFooter
        updateTimestamp={updateTimestamp}
        expanded={expanded}
        handleToggle={handleToggle}
        content={content}
        expandContent={expandContent}
      />
    </StyledCardContent>
  );
};
